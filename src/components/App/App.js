import { useState } from 'react';
import Game from '../../entities/Game';
import Board from '../Board';
import './App.css';

function App() {

   const [game, setGame] = useState(new Game('---------------------------------------------------------------------------------'));

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    setGame(new Game(data.get('sudokuString')));
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="sudokuString">Enter sudoku string</label>
        <input id="sudokuString" name="sudokuString" type="text" />
        <button>Send data!</button>
      </form>

      <Board data={game} />
    </div>
  );
}

export default App;
