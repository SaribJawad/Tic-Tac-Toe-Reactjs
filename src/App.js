import { useEffect, useState } from "react";
import "./App.css";
import Square from "./component/square";

function App() {
  const [square, setSquare] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [status, setStatus] = useState("");

  function getWinner(square) {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
      const [x, y, z] = winningPatterns[i];
      if (square[x] && square[x] === square[y] && square[x] === square[z]) {
        return square[x];
      }
    }
    return null;
  }

  function handleOnClick(getCurrentSquare) {
    // copying sqaure that we wont directly mutate the orignal square
    let copySqaure = [...square];
    if (getWinner(copySqaure) || copySqaure[getCurrentSquare]) return;
    copySqaure[getCurrentSquare] = isXTurn ? "X" : "O";
    setIsXTurn(!isXTurn);
    setSquare(copySqaure);
  }

  useEffect(() => {
    if (!getWinner(square) && square.every((item) => item !== "")) {
      setStatus("Tie!");
    } else if (getWinner(square)) {
      setStatus(`The Winner is ${getWinner(square)}`);
    } else {
      setStatus(`${isXTurn ? "X" : "O"} turn's.`);
    }
  }, [square, isXTurn]);

  function handlePlayAgain() {
    setSquare(Array(9).fill(""));
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <Square value={square[0]} onClick={() => handleOnClick(0)} />
          <Square value={square[1]} onClick={() => handleOnClick(1)} />
          <Square value={square[2]} onClick={() => handleOnClick(2)} />
        </div>
        <div className="row">
          <Square value={square[3]} onClick={() => handleOnClick(3)} />
          <Square value={square[4]} onClick={() => handleOnClick(4)} />
          <Square value={square[5]} onClick={() => handleOnClick(5)} />
        </div>
        <div className="row">
          <Square value={square[6]} onClick={() => handleOnClick(6)} />
          <Square value={square[7]} onClick={() => handleOnClick(7)} />
          <Square value={square[8]} onClick={() => handleOnClick(8)} />
        </div>
      </div>
      <h1>{status}</h1>
      {getWinner(square) ? (
        <button onClick={handlePlayAgain}>Play again!</button>
      ) : null}
    </div>
  );
}

export default App;
