import "./App.css";
import Board from "./component/Board";
import Log from "./component/Log";
import Player from "./component/Player";
import { useState } from "react";
import { winning_combinations } from "./winning_combinations";
import GameOver from "./component/GameOver";

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
  const [players, setplayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  let gameBoard = [...initialBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
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
      winner = players[firstSquareSymbol];
    }
  }
  const gameDraw = gameTurns.length === 9 && !winner;

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
  function handleRematch() {
    setGameTurns([]);
  }

  function handleChangePlayersName(symbol, newName) {
    setplayers((prevplayers) => {
      const updatedPlayers = {
        ...prevplayers,
        [symbol]: newName,
      };
      return updatedPlayers;
    });
  }
  return (
    <main>
      <div id="game_container">
        <ol id="players" className="highlight-player">
          <Player
            initialName=" player 1 "
            symbol=" X "
            isActive={activePlayer === "X"}
            onChangeName={handleChangePlayersName}
          />
          <Player
            initialName=" player 2 "
            symbol=" O "
            isActive={activePlayer === "O"}
            onChangeName={handleChangePlayersName}
          />
        </ol>
        {(winner || gameDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
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
