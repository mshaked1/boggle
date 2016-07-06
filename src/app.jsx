import React, { Component } from 'react'
import { render } from 'react-dom'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Tic Tac Toe</h1>
        <Board/>
      </div>
    )
  }
}
var boxStyle = {
  color: 'red',
  height: '100px',
  width: '100px',
  fontSize: '60px'
}

var Board = React.createClass({
  getInitialState: function(){
    return {

      boardObj: {'00': '-', '01': '-', '02': '-', '10': '-', '11': '-', '12': '-', '20': '-', '21': '-', '22': '-' },
      letter: 'O',
      turns: 0,
    }
  },

  handleSwitchBox: function(event){
    const newState = this.state;
    console.log(newState);
    var board = this.state.boardObj;
    var turns = this.state.turns;
    var letter = this.state.letter;
    var target = event.target.id;
    if ( (this.state.boardObj[target] === '-') && (this.state.letter === 'O') ){
      turns++;
      letter = 'X';
    }
    else if( (this.state.boardObj[target] === '-') && (this.state.letter === 'X') ){
      turns++;
      letter = 'O';
    }
    newState.boardObj[target] = letter;
    newState.letter = letter;
    newState.turns = turns;
    this.setState({newState});
  },

  handleCheckWinner: function(){
    // set state with winner!
  },

  render: function(){
    var board = [];
    for (var rows = 0; rows < 3; rows++){
      board.push(<Row
        handleSwitchBox={this.handleSwitchBox}
        key={rows}
        id={rows}
        boardProp={this.state.boardObj}/>)
    }
    return (<div>{board}</div>);
  },

  componentWillUpdate: function(){
    const win = false;
    const boardSpot = this.state.boardObj;
    const totalTurns = this.state.turns;
    console.log("turns "+totalTurns);
    console.log("board "+boardSpot["10"]+boardSpot["00"]+boardSpot["20"]);
    if(totalTurns > 4 && boardSpot['00'] === boardSpot['10'] ){
      this.win = true;
      alert(this.state.letter+" wins!");
    }
    if(totalTurns > 4 && boardSpot['00'] === boardSpot['01'] && boardSpot['00'] === boardSpot['02']){
      this.win = true;
      alert(this.state.letter+" wins!");
    }
    if(totalTurns > 4 && boardSpot['00'] === boardSpot['11'] && boardSpot['00'] === boardSpot['22']){
      this.win = true;
      alert(this.state.letter+" wins!");
    }
    if(totalTurns > 4 && boardSpot['10'] === boardSpot['11'] && boardSpot['11'] === boardSpot['12']){
      this.win = true;
      alert(this.state.letter+" wins!");
    }
    if(totalTurns > 4 && boardSpot['20'] === boardSpot['21'] && boardSpot['20'] === boardSpot['22']){
      this.win = true;
      alert(this.state.letter+" wins!");
    }
    if(totalTurns > 4 && boardSpot['20'] === boardSpot['11'] && boardSpot['20'] === boardSpot['02']){
      this.win = true;
      alert(this.state.letter+" wins!");
    }
    if(totalTurns > 4 && boardSpot['01'] === boardSpot['11'] && boardSpot['01'] === boardSpot['21']){
      this.win = true;
      alert(this.state.letter+" wins!");
    }
    if(totalTurns > 4 && boardSpot['02'] === boardSpot['12'] && boardSpot['02'] === boardSpot['22']){
      this.win = true;
      alert(this.state.letter+" wins!");
    }
    if(this.win) this.getInitialState();
  }
})

var Row = React.createClass({

  render: function() {
    var ticTacRow = [];
    for (var box = 0; box < 3; box++) {
      ticTacRow.push(<Box
        handleSwitchBox={this.props.handleSwitchBox}
        id={this.props.id.toString() + box}
        key={box}
        boardProp={this.props.boardProp}/>);
    }
    return (<div>{ticTacRow}</div>);
  }
})

var Box = React.createClass({

  render: function() {
    return (<button
      id={this.props.id}
      onClick={this.props.handleSwitchBox}
      style={boxStyle}>{this.props.boardProp[this.props.id.toString()]}</button>);
  }
})

render(<App />, document.getElementById('content'));