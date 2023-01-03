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

describe('place ships test cases', () => {

  test('place ship adds ship to correct coords', () => {
    gameBoardOne.placeShip([[1,2],[1,3],[1,4]], 'battleship')
  
    expect(gameBoardOne.gameboard[1][2]).toBe('battleship');
    expect(gameBoardOne.gameboard[1][3]).toBe('battleship');
    expect(gameBoardOne.gameboard[1][4]).toBe('battleship');
  
  })

  test('ships cant overwrite other ships', () => {
    gameBoardOne.placeShip([[1,2],[1,3],[1,4]], 'battleship');

    expect(() => gameBoardOne.placeShip([[1,2],[1,3],[1,4]], 'carrier')).toThrow(`There's already a ship here.`);
  })

})

