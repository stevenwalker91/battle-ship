import { Player, Computer } from './player';
import { Gameboard } from './gameboard';
import * as display from '../dom/display.js';
import * as json from '../ships.json';

const Game = (playerName) => {
  const playerOne = Player(playerName);
  const playerTwo = Computer('Computer');

  const playerBoard = Gameboard();
  const enemyBoard = Gameboard();

  const data = json;

  for (const boat of data.boats) {

    const playerBoatPosition = playerBoard.randomBoatPosition(boat.size);
    const enemyBoatPosition = enemyBoard.randomBoatPosition(boat.size);

    playerBoard.placeShip(playerBoatPosition, boat.name)
    enemyBoard.placeShip(enemyBoatPosition, boat.name)
  }

  const gameOver = (winner) => {
    display.toggleModal();
    display.addWinnerToModal(winner.name);

  }

  return {
    playerOne,
    playerTwo,
    playerBoard,
    enemyBoard,
    gameOver
  }

}

export {
  Game
}
