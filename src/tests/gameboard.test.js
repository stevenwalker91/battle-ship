import { Gameboard } from '../factories/gameboard.js';

let gameBoardOne;

beforeEach(() => {
  gameBoardOne = Gameboard();
  return gameBoardOne;
})

test('gameboard is set up with appropriate size', () => {
  expect(gameBoardOne.gameboard).toHaveLength(7);
  expect(gameBoardOne.gameboard[6]).toHaveLength(7);
})

describe('place ships on the gameboard', () => {

  beforeEach(() => {
    gameBoardOne.placeShip([[1,2],[1,3],[1,4]], 'battleship')
    gameBoardOne.placeShip([[2,2],[2,3]], 'carrier')
  })
  
  test('ships array is updated with correct coordinates', () => {
    expect(gameBoardOne.ships[0]).toHaveProperty('coordinates', [[1,2],[1,3],[1,4]]);
  });
  test('gameboard is updated with boat position', () => {
    expect(gameBoardOne.gameboard[1][2]).toBe('unhit ship');
    expect(gameBoardOne.gameboard[1][3]).toBe('unhit ship');
    expect(gameBoardOne.gameboard[1][4]).toBe('unhit ship');

  });

  test('ships cant overwrite other ships', () => {
    expect(() => gameBoardOne.placeShip([[1,2],[1,3],[1,4]], 'carrier')).toThrow(`There's already a ship here.`);
  });
})

describe('gameboard can receive attacks', () => {

  beforeEach(() => {
    gameBoardOne.placeShip([[1,2],[1,3],[1,4]], 'battleship');
    gameBoardOne.receiveAttack([1,2]);
  })
  
  test('ship hits property is updated', () => {
    expect(gameBoardOne.ships[0].ship).toHaveProperty('hits', 1);
  })

  test('correct ship object gets updated', () => {
    gameBoardOne.placeShip([[3,4],[3,5]], 'battleship');
    gameBoardOne.placeShip([[4,4],[4,5]], 'battleship');

    gameBoardOne.receiveAttack([4,4]);

    expect(gameBoardOne.ships[1].ship).toHaveProperty('hits', 0);
    expect(gameBoardOne.ships[2].ship).toHaveProperty('hits', 1);
  })

  test('gameboard is updated correctly when a ship is hit', () => {
    expect(gameBoardOne.gameboard[1][2]).toBe('hit');
  })

  test('misses also get added to the gameboard', () => {
    gameBoardOne.receiveAttack([5,6]);
    expect(gameBoardOne.gameboard[5][6]).toBe('miss');
  })
  
})

describe('gameboard can check if the entire fleet is sunk', () => {
  test('returns true if fleet is sunk', () => {
    expect(gameBoardOne.checkFleetSunk()).toBe(true);
  })

  test('returns false if any boats remain', () => {
    gameBoardOne.placeShip([[4,4],[4,5]], 'battleship');

    expect(gameBoardOne.checkFleetSunk()).toBe(false);
  })
})

