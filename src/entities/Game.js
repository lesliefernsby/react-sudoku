import Cell from "./Cell";

class Game {
  constructor(string) {
    this.cells = [];
    [...string].forEach((cell, index) => this.cells.push(new Cell({ id : index, 
                                                                    value : cell
                                                                  })));
  }


}

export default Game;
