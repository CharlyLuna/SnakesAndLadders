class Dice {
  throw() {
    return Math.floor(Math.random() * 6 + 1);
  }
}

class Player {
  constructor() {
    this._position = 0;
  }
  getPosition() {
    return this._position;
  }
  move(amount) {
    this._position += amount;
  }
  setPosition(position) {
    this._position = position;
  }
}

class Board {
  constructor(player1, player2, dice) {
    this._player1 = player1;
    this._player2 = player2;
    this._dice = dice;
    this._cells = new Array(100).fill(0); //.fill(0) para identificar facilmente las escaleras y serpientes
    this._snakes();
    this._ladders();
  }
  _snakes() {
    //indicamos la casilla en la que estara la serpiente y en que casilla acabará;
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
    //indicamos la casilla en la que estara la escalera y en que casilla acabará;
    this._cells[1] = 38;
    this._cells[4] = 14;
    this._cells[9] = 31;
    this._cells[21] = 42;
    this._cells[28] = 84;
    this._cells[37] = 58;
    this._cells[51] = 67;
    this._cells[72] = 91;
  }
  game() {
    while (
      this._player1.getPosition() < 100 &&
      this._player2.getPosition() < 100
    ) {
      this._player1.move(this._dice.throw());
      this._player2.move(this._dice.throw());
      let player1Pos = this._player1.getPosition(); // guardamos la posicion actual del jugador en una variable
      let player2Pos = this._player2.getPosition();

      console.log(`El jugador 1 avanzó a la posicion ${player1Pos}`);
      //Preguntamos si el valor en la casilla es mayor a 0, si lo es entonces debe haber o una escalera o serpiente
      if (this._cells[player1Pos] > 0) {
        this._player1.setPosition(this._cells[player1Pos]); //La posicion cambia a la casilla donde termina la escalera/serpiente
        //Comprobamos si es escalera o serpiente dependiendo si ascendio o descendio de posicion el jugador
        if (this._player1.getPosition() > player1Pos) {
          console.log(
            `Escalera! el jugador 1 esta ahora en la posicion ${this._player1.getPosition()}`
          );
        } else {
          console.log(
            `Serpiente! el jugador 1 esta ahora en la posicion ${this._player1.getPosition()}`
          );
        }
      }
      console.log(`El jugador 2 avanzó a la posicion ${player2Pos}`);
      if (this._cells[player2Pos] > 0) {
        this._player2.setPosition(this._cells[player2Pos]);
        if (this._player2.getPosition() > player2Pos) {
          console.log(
            `Escalera! el jugador 2 esta ahora en la posicion ${this._player2.getPosition()}`
          );
        } else {
          console.log(
            `Serpiente! el jugador 2 esta ahora en la posicion ${this._player2.getPosition()}`
          );
        }
      }
    }
    if (
      this._player1.getPosition() >= 100 &&
      this._player2.getPosition() < 100
    ) {
      console.log("Ganó el jugador 1");
    } else if (
      this._player1.getPosition() >= 100 &&
      this._player2.getPosition() >= 100
    ) {
      console.log("Es un empate");
    } else if (
      this._player1.getPosition() < 100 &&
      this._player2.getPosition() >= 100
    ) {
      console.log("Ganó el jugador 2");
    }
  }
}

let player1 = new Player();
let player2 = new Player();
let dice = new Dice();
let board = new Board(player1, player2, dice);
board.game();
