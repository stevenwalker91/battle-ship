import { Ship } from './ship.js';
import isEqual from 'lodash/isEqual';


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

  const findBoatToAttack = (coord) => {
    //console.log(ships[0])
    //console.log(ships[0].coordinates)

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
    } else {
      gameboard[coord[0]][coord[1]] = 'hit';
      //find relevant boat to update
      findBoatToAttack(coord);
    }
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
  
  }

}