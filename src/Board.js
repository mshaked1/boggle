import React, { Component } from 'react';
import Row from './Row';
import Box from './Box';
import PlayedWords from './PlayedWords';

export default class Board extends Component{
  constructor(props) {
    super(props);
    this.dice = ["", "aaafrs", "aaeeee", "aafirs", "adennn", "aeeeem","aeegmu", "aegmnn", "afirsy", "bjkqxz", "ccenst", "ceiilt","ceilpt", "ceipst", "ddhnot", "dhhlor", "dhlnor", "dhlnor","eiiitt", "emottt", "ensssu", "fiprsy", "gorrvw", "iprrry","nootuw", "ooottu"];
    this.refresh = this.refresh.bind(this);
    this.handleLetterClick = this.handleLetterClick.bind(this);
    this.boardSpots = {};
    this.boggle = this.boggle.bind(this);
    this.boggle();
    this.clearClicks = this.clearClicks.bind(this);
    this.clearClicks();
    this.submit = this.submit.bind(this);
    this.allowedClicks = [];
    this.goodClicks = this.goodClicks.bind(this);
    this.state = {
      trail: [],
      board: this.boardSpots,
      score: 0,
      playedWords: [],
      currentWord: '',
      clicked: this.clicked
    };
  }

  
  // reshuffles board
  boggle(){
    for(let i = 1; i <= 25; i++){
      let letter = this.dice[i].charAt(Math.floor(Math.random()*5)).toUpperCase();
      if (letter === 'Q') letter = 'Qu';
      this.boardSpots[i] = letter;
    };
  }

  // clears board of clicked squares
  clearClicks(){
    this.clicked = [];
    let that = this;
    this.dice.forEach(function(item){
      that.clicked.push('box');
    });
  }

  // calls boggle to reset state
  refresh(){
    this.boggle();
    this.clearClicks();
    this.setState({board: this.boardSpots,
      score: 0,
      playedWords: [],
      currentWord: '',
      clicked: this.clicked
    })
  }

  goodClicks(id){
    this.allowedClicks = [];
    let up = id - 5;
    let down = id + 5;
    let left = id - 1;
    let right = id + 1;
    if(id % 5 === 1){
      this.allowedClicks.push(up,down,right);
      console.log(this.allowedClicks);
    }
    else if (id % 5 === 0){
      this.allowedClicks.push(up, down, left);
      console.log(this.allowedClicks);
    }
    else if (id > 1 && id < 5){
      this.allowedClicks.push(left, right , down);
      console.log(this.allowedClicks);
    }
    else if (id > 21 && id < 25 ){
      this.allowedClicks.push(left, right, up);
      console.log(this.allowedClicks);
    }
    else{
      this.allowedClicks.push(up, down, left, right);
      console.log(this.allowedClicks);
    }
    return this.allowedClicks;
  }

  // highlights clicked letter, adds to current word, tracks trail
  handleLetterClick(event){
    const target = event.target;
    const id = parseInt(target.id);
    let trail = this.state.trail;
    const newLetter = target.value;
    let currentWord = this.state.currentWord;
    const clicked = this.state.clicked;
    if(id === trail[trail.length-1]){
      clicked[target.id] = 'box';
      trail.pop();
      currentWord = currentWord.slice(0,-1);
    }
    else if ( trail.length === 0 || (trail.indexOf(id) === -1  && this.allowedClicks.indexOf(id) > -1) ){
      currentWord += newLetter;
      trail.push(id);
      clicked[id] = 'isClicked';
      this.goodClicks(prevClick||id);
      let prevClick = id;
    }
    this.setState({
      trail: trail,
      currentWord: currentWord,
      clicked: clicked
    });
  }

  // adds score based on word length, adds submitted word to played words bank, clears board of blue squares
  submit(){
    let playedWords = this.state.playedWords;
    playedWords.push(this.state.currentWord);
    let score = this.state.score;
    const length = this.state.currentWord.length;
    console.log(length);
    switch(length) {
      case 0:
      case 1:
      case 2:
        break;
      case 3:
      case 4:
        score += 1;
        break;
      case 5:
        score += 2;
        break;
      case 6:
        score += 3;
        break;
      case 7:
        score += 5;
        break;
      default:
        score += 11;
        break;
    }
    let currentWord = '';
    this.clicked = [];
    let that = this;
    this.dice.forEach(function(item){
      that.clicked.push('box');
    });
    this.setState({
      currentWord: currentWord,
      score: score,
      playedWords: playedWords,
      clicked: this.clicked
    })
  }

  render(){
    var boardArr = [];
    for(let row = 0; row <= 4; row++){
      boardArr.push(<Row
        handleLetterClick={this.handleLetterClick}
        key={row}
        rowId={row}
        board={this.state.board}
        boxStyle={this.boxStyle}
        class={this.clicked}
      />)
      var boxScore = [];
      boxScore.push(<PlayedWords
        key={'hi'}
        playedWords={this.state.playedWords}
        score={this.state.score}
        currentWord={this.state.currentWord}
      />)
    }

    return (
      <div>
        <button
          className={'button'}
          onClick={this.refresh}>
            BOGGLE!
        </button>
        <button
          className={'button'}
          onClick={this.submit}>
            Submit Word!
        </button>
        <div>{boardArr}</div>
        <div>{boxScore}</div>
      </div>
    )
  }
}