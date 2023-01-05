import { Player, Computer } from './player';
import { Gameboard } from './gameboard';

const Game = (playerName) => {
  const playerOne = Player(playerName);
  const playerTwo = Computer('Computer');

  const playerBoard = Gameboard();
  const enemyBoard = Gameboard();

  playerBoard.placeShip([[0,1], [0,2], [0,3]], 'battleship' )
  playerBoard.placeShip( [[1,1], [1,2]], 'patroller' )
  playerBoard.placeShip( [[5,4], [5, 5], [5, 6]], 'destroyer' )

  enemyBoard.placeShip( [[0,1], [0,2], [0,3]], 'battleship' )
  enemyBoard.placeShip( [[1,1], [1,2]], 'patroller' )
  enemyBoard.placeShip( [[5,4], [5, 5], [5, 6]], 'destroyer' )
  


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
