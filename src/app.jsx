import React, { Component } from 'react';
import { render } from 'react-dom';
import Board from './Board';
import Row from './Row';
import Box from './Box';
import PlayedWords from './PlayedWords';


class App extends Component {
  render() {
    return (
      <div className={'board'}>
        <h1>Boggle the Mind</h1>
        <Board/>
      </div>
    )
  }
}



render(<App />, document.getElementById('content'));