import { useState } from 'react'
import './App.css'


function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description = (move > 0) ? 'Ir al movimiento #' + move : 'Ir al inicio del juego';
    
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function Board({ xIsNext, squares, onPlay }) {
  // const [xIsNext, setXIsNext] = useState(true);

  // const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
    // setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status = (winner) ? "Ganador: " + winner : "Siguiente jugador: " + (xIsNext ? "X" : "O");

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={_ => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={_ => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={_ => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={_ => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={_ => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={_ => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={_ => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={_ => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={_ => handleClick(8)} />
      </div>
    </>
  )
}

function Square({ value, onSquareClick }) {

  return (
    <button onClick={onSquareClick} className="square">
      {value}
    </button>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App
