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

  handleSwitchBox: function(target, letter, turns){
    const newState = this.state;
    newState.boardObj[target] = letter;
    newState.letter = letter;
    newState.turns = turns;
    console.log("newState turns "+newState.turns);
    this.setState({newState});
  },

  handleCheckWinner: function(){
    // set state with winner!
  },

  render: function(){
    var board = [];
    for (var rows = 0; rows < 3; rows++){
      board.push(<Row handleSwitchBox1={this.handleSwitchBox} key={rows} id={rows} boardProp={this.state.boardObj} letter={this.state.letter} turns={this.state.turns}/>);
    }
    return (<div>{board}</div>)
  },

  componentDidUpdate: function(){
    const boardSpot = this.state.boardObj;
    const totalTurns = this.state.turns;
    console.log(totalTurns);
    if( (totalTurns > 3) && (  (boardSpot['00'] === boardSpot['10']) && (boardSpot['00'] === boardSpot['20'])))   {
      alert(this.state.letter+" wins!");
    }
    if( (totalTurns > 3) && ( (boardSpot['00'] === boardSpot['01']) && (boardSpot['00'] === boardSpot['02']) )){
      alert(this.state.letter+" wins!");
    }
    if( (totalTurns > 3) && (  (boardSpot['00'] === boardSpot['11']) && (boardSpot['00'] === boardSpot['22'])) ){
      alert(this.state.letter+" wins!");
    }
    if( (totalTurns > 3) && (  (boardSpot['10'] === boardSpot['11']) && (boardSpot['11'] === boardSpot['12'])) ){
      alert(this.state.letter+" wins!");
    }
    if( (totalTurns > 3) && (  (boardSpot['20'] === boardSpot['21']) && (boardSpot['20'] === boardSpot['22'])) ){
      alert(this.state.letter+" wins!");
    }
    if( (totalTurns > 3) && (  (boardSpot['20'] === boardSpot['11']) && (boardSpot['20'] === boardSpot['02'])) ){
      alert(this.state.letter+" wins!");
    }
    if( (totalTurns > 3) && (  (boardSpot['01'] === boardSpot['11']) && (boardSpot['01'] === boardSpot['21'])) ){
      alert(this.state.letter+" wins!");
    }
    if( (totalTurns > 3) && (  (boardSpot['02'] === boardSpot['12']) && (boardSpot['02'] === boardSpot['22']))) {
      alert(this.state.letter+" wins!");
    }
  }
})

var Row = React.createClass({

  render: function() {
    var ticTacRow = [];
    for (var box = 0; box < 3; box++) {
     
      ticTacRow.push(<Box handleSwitchBox2={this.props.handleSwitchBox1} id={this.props.id.toString() + box} key={box} boardProp1={this.props.boardProp} letter={this.props.letter} turns={this.props.turns}/>);
    }
    
    return (<div>{ticTacRow}</div>);
    // return (<div>{ this.state }</div>);
  }
})

var Box = React.createClass({

  switchBox: function(){
    var turns = this.props.turns;
    var target = this.props.id.toString();
    var letter = this.props.letter;
    if ( (this.props.boardProp1[target] === '-') && (letter === 'O') ){
      turns++;
      console.log("turns "+turns);
      letter = 'X';
      this.props.handleSwitchBox2(target, letter, turns);
    }
    else if( (this.props.boardProp1[target] === '-') && (letter === 'X') ){
      turns++;
      letter = 'O';
      this.props.handleSwitchBox2(target, letter, turns);
    }
  },

  checkWinner: function(){
      // logic to determine winner
  },

  render: function() {
    return (<button style={'color: green'} onClick={this.switchBox} style={boxStyle}>{this.props.boardProp1[this.props.id.toString()]}</button>);
  }
})

render(<App />, document.getElementById('content'));