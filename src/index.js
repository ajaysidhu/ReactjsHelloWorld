import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './TicTacToe';
import Clock from './Clock';
// ========================================

ReactDOM.render(
    // <Game />,    //TicTacToe
    <Clock increment={1}/>,
    document.getElementById('root')
);
