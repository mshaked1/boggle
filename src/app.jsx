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
      counter: 0
    }
  },
  
  handleSwitchBox: function(value, targetRow, targetBox, counter){
    console.log(targetRow+targetBox);
    const newState = this.state;
    newState.boardObj[targetRow+targetBox] = value;
    newState.counter = counter;
    this.setState({newState});
  },

  handleCheckWinner: function(){
    // set state with winner!
  },

  render: function(){
    var board = [];
    for (var rows = 0; rows < 3; rows++){
      board.push(<Row handleSwitchBox1={this.handleSwitchBox} key={rows} rowID={rows} boardProp={this.state.boardObj} counter={this.state.counter}/>);
    }
    return (<div>{board}</div>)
  }
})

var Row = React.createClass({


  render: function() {
    var ticTacRow = [];
    for (var box = 0; box < 3; box++) {
     
      ticTacRow.push(<Box handleSwitchBox2={this.props.handleSwitchBox1} row={this.props.rowID} key={box} boxID={box} boardProp1={this.props.boardProp} counter={this.props.counter}/>);
    }
    return (<div>{ticTacRow}</div>);
    // return (<div>{ this.state }</div>);
  }
})

var Box = React.createClass({

  switchBox: function(){
    var targetRow = this.props.row.toString();
    var targetBox = this.props.boxID.toString();
    var letter;
    var counter = this.props.counter;
    if ( (this.props.boardProp1[targetRow+targetBox] === '-') && (counter === 0) ){
      letter = 'X';
      counter++;
      this.props.handleSwitchBox2(letter, targetRow, targetBox, counter);
    }
    else if( (this.props.boardProp1[targetRow+targetBox] === '-') && (counter === 1) ){
      letter = 'O';
      counter--;
      this.props.handleSwitchBox2(letter, targetRow, targetBox, counter);
    }
  },

  checkWinner: function(){
      // logic to determine winner
  },

  render: function() {
    return (<button onClick={this.switchBox} style={boxStyle}>{this.props.boardProp1[this.props.row.toString()+this.props.boxID.toString()]}</button>);
  }
})

render(<App />, document.getElementById('content'));