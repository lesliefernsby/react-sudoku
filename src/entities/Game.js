import Cell from "./Cell";

class Game {
  constructor(string) {
    this.cells = [];
    [...string].forEach((cell, index) => this.cells.push(new Cell({ id : index, 
                                                                    value : cell
                                                                  })));
  }


  checkValid() {
    let isValid = true;

    this.cells.forEach((cell) => {
      if (!cell.isSolved()) isValid = false;

      const row = this.cells.filter((element) => element.row === cell.row && element.id !== cell.id).map((e) => e.value);
      const column = this.cells.filter((element) => element.column === cell.column && element.id !== cell.id).map((e) => e.value);
      const square = this.cells.filter((element) => element.square === cell.square && element.id !== cell.id).map((e) => e.value);

      if (row.includes(cell.value) || column.includes(cell.value) || square.includes(cell.value)) {
        isValid = false;
      }
    })

    return isValid;
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


  findUniqueCandidateInRowColumnOrSquare() {

    this.cells.forEach((cell) => {

      const row = this.cells.filter((element) => element.row === cell.row && element.id !== cell.id).flatMap((element) => element.candidates);
      const column = this.cells.filter((element) => element.column === cell.column && element.id !== cell.id).flatMap((element) => element.candidates);
      const square = this.cells.filter((element) => element.square === cell.square && element.id !== cell.id).flatMap((element) => element.candidates);

      for (let candidate of cell.candidates) {
        if (!row.includes(candidate) && !column.includes(candidate) && !square.includes(candidate)) {
          cell.candidates = [ candidate ];
          break;
        }
      }
    })
  }

  nakedTwinElimination() {

    const containsAll = (arr1, arr2) => 
                arr2.every(arr2Item => arr1.includes(arr2Item));

    const nakedPair = (el1, el2) => {

      console.log(el1, el2);

      if (el1.row === el2.row) {
        this.cells.filter((el) => el.row === el1.row && el.id !== el1.id && el.id !== el2.id).forEach((el) => {
          el.candidates = el.candidates.filter((c) => !el1.candidates.includes(c));
        })
      }

      if (el1.column === el2.column) {
        this.cells.filter((el) => el.column === el1.column && el.id !== el1.id && el.id !== el2.id).forEach((el) => {
          el.candidates = el.candidates.filter((c) => !el1.candidates.includes(c));
        })
      }

      if (el1.square === el2.square) {
        this.cells.filter((el) => el.square === el1.square && el.id !== el1.id && el.id !== el2.id).forEach((el) => {
          el.candidates = el.candidates.filter((c) => !el1.candidates.includes(c));
        })
      }

    }

    for (let i = 1; i <= 9; i++) {
      const row = this.cells.filter((element) => element.row === i);
      row.forEach((element) => {
        row.filter((e) => e.id !== element.id)
            .forEach((otherElement) => {
              if (element.candidates.length === 2 && otherElement.candidates.length === 2 
                && containsAll(element.candidates, otherElement.candidates) 
                && containsAll(otherElement.candidates, element.candidates)) {
                  nakedPair(element, otherElement);
              }
            })
      })
    }

    for (let i = 1; i <= 9; i++) {
      const column = this.cells.filter((element) => element.column === i);
      column.forEach((element) => {
        column.filter((e) => e.id !== element.id)
            .forEach((otherElement) => {
              if (element.candidates.length === 2 && otherElement.candidates.length === 2 
                && containsAll(element.candidates, otherElement.candidates) 
                && containsAll(otherElement.candidates, element.candidates)) {
                  nakedPair(element, otherElement);
              }
            })
      })
    }

    for (let i = 1; i <= 9; i++) {
      const square = this.cells.filter((element) => element.square === i);
      square.forEach((element) => {
        square.filter((e) => e.id !== element.id)
            .forEach((otherElement) => {
              if (element.candidates.length === 2 && otherElement.candidates.length === 2 
                && containsAll(element.candidates, otherElement.candidates) 
                && containsAll(otherElement.candidates, element.candidates)) {
                  nakedPair(element, otherElement);
              }
            })
      })
    }

  }
}

export default Game;
