import { Gameboard } from '../factories/gameboard.js';

export const Player = (name) => {
  
  const makeAttack = (coords, enemyBoard) => {
    return enemyBoard.receiveAttack(coords);
  }

  return {
    name,
    makeAttack
  }
}

export const Computer = (name) =>  {

  const dumbComputerAttack = (playerBoard) => {
    const availableMoves = playerBoard.getAvailableMoves();
    const numberOfMoves = availableMoves.length;
    const selectedMove = Math.floor(Math.random() * numberOfMoves);
    playerBoard.receiveAttack(availableMoves[selectedMove]);

  }

  return Object.assign({}, Player(name), {
    dumbComputerAttack
  });

}