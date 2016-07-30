import React, { Component } from 'react';
import Box from './Box';

const Row = (props) => {
  var rowArr = [];
  for(let box = 1; box <= 5; box++){
    rowArr.push(<Box 
      handleLetterClick={props.handleLetterClick}
      key={(box + (props.rowId * 5)).toString()}
      boxId={box + (props.rowId * 5)}
      board={props.board}
      letter={props.board[box + (props.rowId * 5)]}
      boxStyle={props.boxStyle}
      class={props.class}
    />)
  }

  return (
    <div>{rowArr}</div>
  )
}

module.exports = Row;