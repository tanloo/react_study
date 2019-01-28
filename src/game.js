import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateWinner(squares) {
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
            return {winner:squares[a], line: [a, b, c]};
        }
    }
    return {winner: null, line: []};
}

function Square(props) {
    if (props.highlight) {
        return (
            <button className="square" onClick={() => props.onClick()} style={{color: "red"}}>
                {props.value}
            </button>
        );
    }else {
        return (
            <button className="square" onClick={() => props.onClick()}>
                {props.value}
            </button>
        );
    }

}

class Board extends React.Component {
    renderSquare(i) {
        return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} highlight={this.props.winnerLine.includes(i)}/>;
    }
    render() {
        var rows = [];
        for (var i=0; i<3 ; i++){
            var row = [];
            for (var j=3*i; j<3*i+3;j++){
                row.push(this.renderSquare(j));
            }
            rows.push(<div className="board=row" key={i}>{row}</div>)
        }
        return (
            <div>
                {rows}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                lastStep: 'Game start',
            }],
            xIsNext: true,
            stepNumber: 0
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        const location = '(' + (Math.floor(i / 3) + 1) + ',' + ((i % 3) + 1) + ')';
        const desc = squares[i] + location;
        this.setState({
            history: history.concat([{
                squares: squares,
                lastStep:desc,
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares).winner;
        const winnerLine = calculateWinner(current.squares).line;
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        const moves = history.map((step,move,arr) =>{
            const desc = step.lastStep;
            if (move === this.state.stepNumber) {
                return(
                    <li key={move}>
                        <a href='javascript:void(0)' onClick={()=>this.jumpTo(move)}><strong>{desc}</strong></a>
                    </li>
                )
            }
            return(
                <li key={move}>
                    <a href='javascript:void(0)' onClick={()=>this.jumpTo(move)}>{desc}</a>
                </li>
            )
        })
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} winnerLine={winnerLine}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

/*ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);*/
