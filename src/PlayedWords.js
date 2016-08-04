import React, { Component } from 'react';

const PlayedWords = (props) => {
	var words = [];
	props.playedWords.forEach(function(word){
		words.push(<span key={word}>{word} </span>)
	});
	return(
		<div>
			<h2>Current Word: <span className='word'>{props.currentWord}</span></h2>
			<h2>Played Words</h2>
			<div className='playedWords'>{words}</div>
			<h2>Score: {props.score}</h2>
			<h2>Last Word: <span className='word'>{props.lastWord} - {props.lastScore}</span></h2>
		</div>
	)
}

module.exports = PlayedWords;