class Dice {
  throw() {
    return Math.floor(Math.random() * 6 + 1);
  }
}

class Player {
  constructor() {
    this._position = 0;
  }

  move(amount) {
    this._position += amount;
  }

  useLadder(position) {
    this._position = position;
  }

  useSnake(position) {
    this._position = position;
  }
}

class Board {
  constructor() {
    this._cells = new Array(100);
    this._snakes();
    this._ladders();
  }
  _snakes() {
    this._cells[17] = 7;
    this._cells[54] = 34;
    this._cells[62] = 19;
    this._cells[64] = 60;
    this._cells[87] = 36;
    this._cells[93] = 73;
    this._cells[95] = 75;
    this._cells[98] = 79;
  }

  _ladders() {
    this._cells[1] = 38;
    this._cells[4] = 14;
    this._cells[9] = 31;
    this._cells[21] = 42;
    this._cells[28] = 84;
    this._cells[37] = 58;
    this._cells[51] = 67;
    this._cells[72] = 91;
  }
}
let board = new Board();
console.log(board._cells);
