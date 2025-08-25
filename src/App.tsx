import React, { useEffect, useState } from 'react';
import "./App.css";
import { Board } from './models/Board';
import BoardComponent from './components/BoardComponent';
import { Colors } from './models/Colors';
import { Player } from './models/Player';
import LostFigures from './components/LostFigures';

const App = () => {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
  }, [])

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  function restart() {
    const newBoard = new Board();
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  return (
    <div className="app">
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures title='White figures' figures={board.lostWhiteFigure} />
        <LostFigures title='Black figures' figures={board.lostBlackFigure} />
      </div>
    </div>
  );
};

export default App;