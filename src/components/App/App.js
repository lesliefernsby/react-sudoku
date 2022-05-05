import { useState } from 'react';
import Game from '../../entities/Game';
import Board from '../Board';
import './App.css';

function App() {

  const [game, setGame] = useState(new Game('---------------------------------------------------------------------------------'));
  
  function handleSubmit(event){
    event.preventDefault();

    const data = new FormData(event.target);
    setGame(new Game(data.get('sudokuString')));
  }

  function handleCalculateCandidates() {
    game.calculateCandidates();
    setGame(Object.assign(Object.create(Object.getPrototypeOf(game)), game)); //created a copy of the Game for the state to update, don't like it
  }

  function handleApproveSingleCandidates() {
    game.approveSingleCandidates();
    setGame(Object.assign(Object.create(Object.getPrototypeOf(game)), game)); //created a copy of the Game for the state to update, don't like it
  }

  function handleUniqueCandidateInRowColumnOrSquare() {
    game.findUniqueCandidateInRowColumnOrSquare();
    setGame(Object.assign(Object.create(Object.getPrototypeOf(game)), game)); //created a copy of the Game for the state to update, don't like it
   }

   function handleNakedTwins() {
    game.nakedTwinElimination();
    setGame(Object.assign(Object.create(Object.getPrototypeOf(game)), game)); //created a copy of the Game for the state to update, don't like it
  }

  function handleValid() {
    if (game.checkValid()) alert('The game is valid'); 
    else alert('The game is NOT valid');
  }


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="sudokuString">Enter sudoku string</label>
        <input id="sudokuString" name="sudokuString" type="text" />
        <button>Send data!</button>
      </form>

      <button onClick={handleCalculateCandidates}>Calculate candidates</button>
      <button onClick={handleUniqueCandidateInRowColumnOrSquare}>Find LONERS in a row/column/square</button>
      <button onClick={handleNakedTwins}>Find naked twins</button>
      <button onClick={handleApproveSingleCandidates}>Approve single candidates</button>

      <button onClick={handleValid}>CHECK IF THE GAME IS VALID</button>
 
      <Board data={game} />
    </div>
  );
}

export default App;
