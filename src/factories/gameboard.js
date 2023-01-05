import { Ship } from './ship.js';
import isEqual from 'lodash/isEqual';
import * as listeners from '../dom/listeners.js';


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
  
  const ships = [];

  const _checkCoordEmpty = coord => {
    
    if (gameboard[coord[0]][coord[1]] === null) {
      return true;
    }
    return false;
  }

  const _checkCoordLegal = coord => {
    const gameBoardPiece = gameboard[coord[0]][coord[1]];

    if (gameBoardPiece === null || gameBoardPiece === 'unhit ship'){
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
    ships.push({ship: newShip, coordinates: coords, status: 'not sunk'});

    for (const coord of coords) {
      gameboard[coord[0]][coord[1]] = 'unhit ship';
    }
  }

  const _attackBoat = (coord) => {
    // can't directly compare an array to an array so iterate and compare values
    ships.forEach(boat => {
      boat.coordinates.forEach(position => {
        if(isEqual(position, coord)){
          boat.ship.hit();
        }
      })
    })
  }

  const receiveAttack = (coord) => {
    if (!_checkCoordLegal(coord)) throw `You've already made that move.`;

    if (_checkCoordEmpty(coord)) {
      gameboard[coord[0]][coord[1]] = 'miss';
      return 'miss';
    } else {
      gameboard[coord[0]][coord[1]] = 'hit';
      //find relevant boat to update
      _attackBoat(coord);
      return 'hit';
    }
  }

  const checkFleetSunk = () => {
    for (const boat of ships) {
      if(!boat.ship.isSunk()) return false;
    }
    return true;
  }

  const getAvailableMoves = () => {
    const availableMoves = [];
    gameboard.forEach((outerArray, outerIndex) => {
      outerArray.forEach((innerArray, innerIndex) => {
        if(_checkCoordLegal([outerIndex, innerIndex])) {
          availableMoves.push([outerIndex, innerIndex])
        }
        
      })
    })

    return availableMoves;
  }

  return {
    get gameboard() {
      return gameboard;
    },
    get ships() {
      return ships;
    },
    placeShip,
    receiveAttack,
    checkFleetSunk,
    getAvailableMoves
  
  }

}