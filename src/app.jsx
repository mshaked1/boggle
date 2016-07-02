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
    return {value: '-'};
  },
  handleSwitchBox: function(value){
    this.setState({value: value});
    console.log(value);
  },

  render: function(){
    var board = [];
    for (var rows = 0; rows < 3; rows++){
      board.push(<Row handleSwitchBox1={this.handleSwitchBox} value={this.state.value} key={rows}/>);
    }
    console.log(board);
    return (<div>{board}</div>)
  }
})

var Row = React.createClass({


  render: function() {
    var ticTacRow = [];
    for (var i = 0; i < 3; i++) {
      console.log(this.props.value);
      ticTacRow.push(<Box handleSwitchBox2={this.props.handleSwitchBox1} value={this.props.value} key={i}/>);
    }
    console.log(ticTacRow);
    return (<div>{ticTacRow}</div>);
    // return (<div>{ this.state }</div>);
  }
})

var Box = React.createClass({

  switchBox: function(){
    console.log(this.props.value+"~!!!")
    if (this.props.value === 'X') this.props.handleSwitchBox2('O');
    else (this.props.handleSwitchBox2('X'));
  },

  render: function() {
    console.log(this.props.value);
    return (<button onClick={this.switchBox} style={boxStyle}>{this.props.value}</button>);
  }
})

render(<App />, document.getElementById('content'));