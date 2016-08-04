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
      lastScore: 0,
      lastWord: '',
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
      lastScore: 0,
      lastWord: '',
      playedWords: [],
      currentWord: '',
      clicked: this.clicked,
      trail: []
    })
  }

  goodClicks(id){
    this.allowedClicks = [];
    let up = id - 5;
    let down = id + 5;
    let left = id - 1;
    let right = id + 1;
    let upLeft = id - 6;
    let upRight = id - 4;
    let downLeft = id + 4;
    let downRight = id + 6;
    if(id % 5 === 1) this.allowedClicks.push(up,down,right, upRight, downRight);
    else if (id % 5 === 0) this.allowedClicks.push(up, down, left, upLeft, downLeft);
    else if (id > 1 && id < 5) this.allowedClicks.push(left, right , down, downLeft, downRight);
    else if (id > 21 && id < 25 ) this.allowedClicks.push(left, right, up, upLeft, upRight);
    else this.allowedClicks.push(up, down, left, right, upLeft, upRight, downLeft, downRight);
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

    // player clicks on last clicked letter to backtrack
    if(id === trail[trail.length-1]){
      clicked[target.id] = 'box';
      trail.pop();
      currentWord = currentWord.slice(0,-1);
      this.goodClicks(trail[trail.length - 1]);
      let prevClick = trail[trail.length - 2];
    }
    // player clicks on fresh board or adjacent and empty square
    else if ( trail.length === 0 || (trail.indexOf(id) === -1  && this.allowedClicks.indexOf(id) > -1) ){
      currentWord += newLetter;
      trail.push(id);
      clicked[id] = 'isClicked';
      this.goodClicks(prevClick||id);
      let prevClick = id;
    }
    this.setState({
      trail: trail,
      currentWord: currentWord.toUpperCase(),
      clicked: clicked
    });
  }

  // checks if word has already been played, adds score based on word length, adds submitted word to played words bank, clears board of blue squares
  submit(){
    let lastWord = 'Already played';
    let score = this.state.score;
    let playedWords = this.state.playedWords;
    let lastScore = 0;
    if(playedWords.indexOf(this.state.currentWord) === -1){
      lastWord = this.state.currentWord;
      playedWords.push(this.state.currentWord);
      const length = this.state.currentWord.length;
      switch(length) {
        case 0:
        case 1:
        case 2:
          break;
        case 3:
        case 4:
          lastScore = 1;
          score += 1;
          break;
        case 5:
          lastScore = 2;
          score += 2;
          break;
        case 6:
          lastScore = 3;
          score += 3;
          break;
        case 7:
          lastScore = 5;
          score += 5;
          break;
        default:
          lastScore = 11;
          score += 11;
          break;
      }
    }
    this.clicked = [];
    let that = this;
    this.dice.forEach(function(item){
      that.clicked.push('box');
    });
    let trail = [];
    console.log(lastWord);
    this.setState({
      currentWord: '',
      lastWord: lastWord.toUpperCase(),
      lastScore: lastScore,
      score: score,
      playedWords: playedWords,
      clicked: this.clicked,
      trail: trail
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
        lastWord={this.state.lastWord}
        lastScore={this.state.lastScore}
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