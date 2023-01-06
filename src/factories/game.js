import { Player, Computer } from './player';
import { Gameboard } from './gameboard';
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


  


  return {
    playerOne,
    playerTwo,
    playerBoard,
    enemyBoard
  }

}

export {
  Game
}
