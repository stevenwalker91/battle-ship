import { Ship } from './ship.js';


export const Gameboard = () => {
  // gameboard tracks all misses or hits
  let gameboard = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ];

  //ship positions tracks where each boat is
  const shipPositions = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ];

  const _checkCoordEmpty = coord => {
    
    if (shipPositions[coord[0]][coord[1]] === null) {
      return true;
    }
    return false;
  }

  const _checkCoordLegal = coord => {
    const gameBoardPiece = gameboard[coord[0]][coord[1]];

    if (gameBoardPiece === null) {
      return true;
    };
    return false;
  }

  const placeShip = (coords, shipType) => {
    
    const shipSize = coords.length;

    // first iterate over the coordinates and check there is no ship there already
    for (const coord of coords) {
      if (!_checkCoordEmpty(coord)) throw `There's already a ship here.`;
    }

    const newShip = Ship(shipSize);
    
    for (const coord of coords) {
      shipPositions[coord[0]][coord[1]] = newShip;
    }
  }

  const receiveAttack = (coord) => {
    if (!_checkCoordLegal(coord)) throw `You've already made that move.`;

    if (_checkCoordEmpty(coord)) {
      gameboard[coord[0]][coord[1]] = 'miss';
    } else {
      gameboard[coord[0]][coord[1]] = 'hit';
      shipPositions[coord[0]][coord[1]].hit();
    
    }
  }


  return {
    get gameboard() {
      return gameboard;
    },
    get shipPositions() {
      return shipPositions;
    },
    placeShip,
    receiveAttack
  }

}