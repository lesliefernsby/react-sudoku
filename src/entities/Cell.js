class Cell {
  constructor(args) {
    this.value = args.value;
    this.id = args.id;
    this.row = Math.floor( args.id / 9 );
    this.column = args.id % 9;
    this.square = Math.floor( this.row / 3 ) * 3 + Math.floor( this.column / 3 );
    this.candidates = [];
  }

  isSolved() {
    return this.value === '-' ? false : true;
  } 

  setCandidates(candidates) {
    this.candidates = candidates;
  }

  singleCandidate() {
    return this.candidates.length === 1;
  }

  
}

export default Cell;
