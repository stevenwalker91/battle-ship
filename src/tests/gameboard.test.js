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
  
  test('place ship adds ship to correct coords', () => {
  
    expect(gameBoardOne.shipPositions[1][2]).toHaveProperty('length', 3);
    expect(gameBoardOne.shipPositions[1][3]).toHaveProperty('length', 3);
    expect(gameBoardOne.shipPositions[1][4]).toHaveProperty('length', 3);
    expect(gameBoardOne.shipPositions[2][3]).toHaveProperty('length', 2);
  
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
    expect(gameBoardOne.shipPositions[1][2]).toHaveProperty('hits', 1);
  })

  test('gameboard is updated correctly when a ship is hit', () => {
    expect(gameBoardOne.gameboard[1][2]).toBe('hit');
  })

  test('misses also get added to the gameboard', () => {
    gameBoardOne.receiveAttack([5,6]);
    expect(gameBoardOne.gameboard[5][6]).toBe('miss');
    expect(gameBoardOne.shipPositions[5][6]).toBe(null);
  })
  
})

