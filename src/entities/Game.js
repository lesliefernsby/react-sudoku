import Cell from "./Cell";

class Game {
  constructor(string) {
    this.cells = [];
    [...string].forEach((cell, index) => this.cells.push(new Cell({ id : index, 
                                                                    value : cell
                                                                  })));
  }

  calculateCandidates() {

    this.cells.forEach((cell) => {
      if (!cell.isSolved()) {
        const candidates = [];

        const row = this.cells.filter((element) => element.row === cell.row && element.id !== cell.id).map((e) => e.value);
        const column = this.cells.filter((element) => element.column === cell.column && element.id !== cell.id).map((e) => e.value);
        const square = this.cells.filter((element) => element.square === cell.square && element.id !== cell.id).map((e) => e.value);


        for (let candidate = 1; candidate <= 9; candidate++) {
          if (!row.includes(`${candidate}`) && !column.includes(`${candidate}`) && !square.includes(`${candidate}`)) {
            candidates.push(`${candidate}`);
          }
        }

        cell.setCandidates(candidates);  
      }
    });
  }


  approveSingleCandidates() {
    this.cells.forEach((cell) => {
      if (cell.singleCandidate()) {
        cell.value = cell.candidates[0];
        cell.candidates = [];
      }
    })
  }
}

export default Game;
