import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = (props) => {
    return (
        <button
            className="square"
            onClick={() => {
                props.onClick();
            }}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }
    // renderSquare() {
    //     let array = Array(9).fill('1');
    //     console.log('i is ' + array);
    //     // array.map((i) => {
    //     //     console.log('i is ' + i);
    //     //     return true;
    //     // });
    // }
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                {/* {this.renderSquare()} */}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{                         //history
                squares: Array(9).fill(null),   //single square
            }],
            stepNumber: 0,                      //currently viewing step
            xIsNext: true                       //determine next player
        }
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);     //reset history to currently chosen step
        const current = this.state.history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }
    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
    jumpTo(move) {
        this.setState({
            stepNumber: move,
            xIsNext: move % 2 === 0     //determine next player
        });
    }
    render() {
        const history = this.state.history;
        const current = this.state.history[this.state.stepNumber];    //to show currently selected step
        const winner = this.calculateWinner(current.squares);
        // console.log('winner: ', winner);
        console.log('current is: ', this.state.history[0]);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move # ' + move
                : 'Go to start the game'
            return (
                <li
                    key={move}
                >
                    <button
                        onClick={() => this.jumpTo(move)}
                    >{desc}</button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                    <div
                        style={{
                            marginTop: 20
                        }}
                    >
                        <button
                            onClick={() => {
                                this.setState({
                                    history: [{
                                        squares: Array(9).fill(null)
                                    }],
                                    stepNumber: 0,
                                    xIsNext: true
                                })
                            }}
                        >
                            Reset
                    </button>
                    </div>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>

            </div>
        );
    }
}
export default Game;
