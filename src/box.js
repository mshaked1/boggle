import React, { Component } from 'react';

const Box = (props) => {
  return(
    <button
      value={props.letter}
      className={props.class[props.boxId]}
      id={props.boxId}
      onClick={props.handleLetterClick}
      letter={props.letter}
      style={props.boxStyle}
    >
      {props.letter}
    </button>
  )
}

module.exports = Box;