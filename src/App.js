import "./App.css";
import Board from "./component/Board";
import Log from "./component/Log";
import Player from "./component/Player";
import { useState } from "react";
import { winning_combinations } from "./winning_combinations";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getActivePlayer(gameTurns) {
  let curPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    curPlayer = "O";
  }
  return curPlayer;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [isShowLog, setIsShowLog] = useState(false);
  const activePlayer = getActivePlayer(gameTurns);

  let gameBoard = initialBoard;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
    console.log(gameBoard);
  }
  console.log("===" + gameBoard);
  let winner;
  for (const combination of winning_combinations) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  function handleSquere(rowindex, colindex) {
    setGameTurns((prevTurn) => {
      const curPlayer = getActivePlayer(prevTurn);
      const updatedTurns = [
        { square: { row: rowindex, col: colindex }, player: curPlayer },
        ...prevTurn,
      ];
      return updatedTurns;
    });
  }
  function handleShowLog() {
    setIsShowLog((prevShowLog) => !prevShowLog);
  }
  return (
    <main>
      <div id="game_container">
        <ol id="players" className="highlight-player">
          <Player
            initialName=" player 1 "
            symbol=" X "
            isActive={activePlayer === "X"}
          />
          <Player
            initialName=" player 2 "
            symbol=" O "
            isActive={activePlayer === "O"}
          />
        </ol>
        {console.log(winner)}
        {winner && <p>You won, {winner}!</p>}
        <Board onSelectSquere={handleSquere} board={gameBoard} />
      </div>
      <div id="log">
        <button className="show-button" onClick={handleShowLog}>
          {isShowLog ? "Show Log" : "Hide Log"}
        </button>
        {isShowLog ? <></> : <Log turns={gameTurns} />}
      </div>
    </main>
  );
}

export default App;
