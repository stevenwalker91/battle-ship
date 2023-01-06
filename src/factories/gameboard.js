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

    const newShip = Ship(shipSize, shipType);
    ships.push({ship: newShip, coordinates: coords, status: 'not sunk'});

    for (const coord of coords) {
      gameboard[coord[0]][coord[1]] = 'unhit ship';
    }
  }

  const _attackBoat = (coord) => {
    // can't directly compare an array to an array so iterate and compare values
    
    for (const boat of ships) {

      for (const position of boat.coordinates) {
        if(isEqual(position, coord)){
          boat.ship.hit();
          const returnValue = { status: 'hit', boatSunk: false, coord: position, shipType: boat.ship.type }
          if(boat.ship.isSunk()) {
            boat.status = 'sunk';
            returnValue.boatSunk = true;
          }
          return returnValue;
        }
      }
    }
  }


  const receiveAttack = (coord) => {
    if (!_checkCoordLegal(coord)) throw `You've already made that move.`;

    if (_checkCoordEmpty(coord)) {
      gameboard[coord[0]][coord[1]] = 'miss';
      return { status: 'missed', boatSunk: false, coord: coord }
    } else {
      gameboard[coord[0]][coord[1]] = 'hit';
      //find relevant boat to update
      
      return _attackBoat(coord);
    }
  }

  const checkFleetSunk = () => {
    for (const boat of ships) {
      if(!boat.ship.isSunk()) return false;
    }
    return true;
  }

  const getAvailableMoves = (board) => {
    const availableMoves = [];
    board.forEach((outerArray, outerIndex) => {
      outerArray.forEach((innerArray, innerIndex) => {
        if(_checkCoordLegal([outerIndex, innerIndex])) {
          availableMoves.push([outerIndex, innerIndex])
        }
        
      })
    })

    return availableMoves;
  }

  const getBoatPositions = () => {
    const boatPositions= [];
    gameboard.forEach((outerArray, outerIndex) => {
      outerArray.forEach((innerArray, innerIndex) => {
        if(innerArray === 'unhit ship' || innerArray === 'hit') {
          boatPositions.push([outerIndex, innerIndex])
        }
      })
    })

    return boatPositions;
  }

  const randomBoatPosition = (length) => {
    const potentialPosition = [];

    const searchGameboardRows = () => {
      const viableStartPositions = [];

      // iterae through the rows and add to array of viable positions when length is found
      gameboard.forEach((row, rowIndex) => {
        let count = 0;
        row.forEach((item, itemIndex) => {
          if (item === null) {
            count ++;
          } else {
            count = 0;
          }
          // return the item - length to go back and get the starting point rather than end
          if (count >= length) {
            viableStartPositions.push([rowIndex, itemIndex-length+1]);
          }
        })
      })
      return viableStartPositions;
    }

    const generateReturnCoords = (start, direction) => {
      const returnArray = [];
      const startRow = start[0];
      const startItem = start[1];

      if (direction === 'horizontal') {
        for (let i = startItem; i < startItem + length; i++) {
          returnArray.push([startRow, i]);
        }
      } else {
        for (let i = startRow; i < startRow + length; i++) {
          returnArray.push([i, startItem]);
        }
      }
      return returnArray
    }

    let potentialStartingPoints;
    let direction;

    // randomly decide if the boat will be placed vertically or hortizontally
    if (Math.floor(Math.random() * 2) === 1) {
      direction = 'horizontal';
      potentialStartingPoints = searchGameboardRows();
    } else {
      direction = 'horizontal';
      potentialStartingPoints = searchGameboardRows();
    }

    const randomStartPoint = Math.floor(Math.random() * potentialStartingPoints.length);

    const startPoint = potentialStartingPoints[randomStartPoint];
    const returnValues = generateReturnCoords(startPoint, direction)


    return returnValues
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
    getAvailableMoves,
    getBoatPositions,
    randomBoatPosition
  
  }

}