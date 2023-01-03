
export const Gameboard = () => {
  let gameboard = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
  ]

const placeShip = (coords, shipType) => {
  
  // first iterate over the coordinates and check there is no ship there already
  for (const coord of coords) {
    if (!_checkCoordEmpty(coord)) throw `There's already a ship here.`;
  }
  
  for (const coord of coords) {
    gameboard[coord[0]][coord[1]] = shipType;
  }
}

const _checkCoordEmpty = (coord) => {
  if (gameboard[coord[0]][coord[1]] === null) {
    return true;
  }
  return false;
}

return {
  get gameboard() {
    return gameboard;
  },
  placeShip

}

}