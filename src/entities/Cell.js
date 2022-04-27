class Cell {
  constructor(args) {
    this.value = args.value;
    this.id = args.id;
    this.row = Math.floor( args.id / 9 );
  }
}

export default Cell;
