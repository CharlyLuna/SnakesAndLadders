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

  useLadder(position) {
    this._position = position;
  }

  useSnake(position) {
    this._position = position;
  }
}

class Board {
  constructor(player1, player2, dice) {
    this._player1 = player1;
    this._player2 = player2;
    this._dice = dice;
    this._cells = new Array(100);
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
  // metodo para saber si esta sobre una escalera
  isLadderOrSnake(position) {
    let ladder;
    switch (position) {
      case 1:
      case 4:
      case 9:
        ladder = true;
        break;
      case 17:
        ladder = false;
        break;
      case 21:
      case 28:
      case 37:
      case 51:
        ladder = true;
        break;
      case 54:
      case 62:
      case 64:
        ladder = false;
        break;
      case 72:
        ladder = true;
        break;
      case 87:
      case 93:
      case 95:
      case 98:
        ladder = false;
        break;
    }
    return ladder;
  }
  game() {
    while (
      this._player1.getPosition() < 100 &&
      this._player2.getPosition() < 100
    ) {
      this._player1.move(this._dice.throw());
      this._player2.move(this._dice.throw());
      console.log(
        `El jugador 1 esta en la posicion ${this._player1.getPosition()}`
      );
      /* Si el jugador cae en una escalera se comprueba con el metodo 
      y asciende a la casilla correspondiente, si sale falso entonces 
      significa que cayó en una serpiente y desciende a la casilla que corresponda */
      if (this.isLadderOrSnake(this._player1.getPosition())) {
        this._player1.useLadder(this._cells[this._player1.getPosition()]);
        // assciende a la casilla que esta guardada como posicion final de la escalera
        console.log(
          `Escalera! el jugador 1 esta ahora en la posicion ${this._player1.getPosition()}`
        );
      } else if (this.isLadderOrSnake(this._player1.getPosition()) === false) {
        this._player1.useSnake(this._cells[this._player1.getPosition()]);
        // desciende a la casilla que esta guardada como posicion final de la serpiente
        console.log(
          `Serpiente! el jugador 1 esta ahora en la posicion ${this._player1.getPosition()}`
        );
      }
      console.log(
        `El jugador 2 esta en la posicion ${this._player2.getPosition()}`
      );
      if (this.isLadderOrSnake(this._player2.getPosition())) {
        this._player2.useLadder(this._cells[this._player2.getPosition()]);
        // assciende a la casilla que esta guardada como posicion final de la escalera
        console.log(
          `Escalera! el jugador 2 esta ahora en la posicion ${this._player2.getPosition()}`
        );
      } else if (this.isLadderOrSnake(this._player2.getPosition()) === false) {
        this._player2.useSnake(this._cells[this._player2.getPosition()]);
        // desciende a la casilla que esta guardada como posicion final de la serpiente
        console.log(
          `Serpiente! el jugador 2 esta ahora en la posicion ${this._player2.getPosition()}`
        );
      }
    }
    if (player1.getPosition() >= 100 && player2.getPosition() < 100) {
      console.log("Ganó el jugador 1");
    } else if (player1.getPosition() >= 100 && player2.getPosition() >= 100) {
      console.log("Es un empate");
    } else if (player1.getPosition() < 100 && player2.getPosition() >= 100) {
      console.log("Ganó el jugador 2");
    }
  }
}

let player1 = new Player();
let player2 = new Player();
let dice = new Dice();
let board = new Board(player1, player2, dice);
board.game();
