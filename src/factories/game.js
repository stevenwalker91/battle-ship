import { Player, Computer } from './player';
import { Gameboard } from './gameboard';

const Game = (playerName) => {
  const playerOne = Player(playerName);
  const playerTwo = Computer('evilAI');

  const playerBoard = Gameboard();
  const enemyBoard = Gameboard();

  playerBoard.placeShip( [[0,1], [0,2], [0,3]] )
  playerBoard.placeShip( [[1,1], [1,2]] )
  playerBoard.placeShip( [[5,4], [5, 5], [5, 6]] )

  enemyBoard.placeShip( [[0,1], [0,2], [0,3]] )
  enemyBoard.placeShip( [[1,1], [1,2]] )
  enemyBoard.placeShip( [[5,4], [5, 5], [5, 6]] )
  


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
