import { Player, Computer } from '../factories/player.js';
import { Gameboard } from '../factories/gameboard.js';

let playerOne = Player('Player One');
let computerPlayer = Computer('AI Computer');


describe('can create players', () => {
  test('player object created with correct attributes', () => {


    expect(playerOne).toHaveProperty('name', 'Player One')
    expect(playerOne).toHaveProperty('makeAttack')
  })

  test('computer object created with correct attributes', () => {

    expect(computerPlayer).toHaveProperty('name', 'AI Computer')
    expect(computerPlayer).toHaveProperty('makeAttack')
    expect(computerPlayer).toHaveProperty('dumbComputerAttack')

  })
})

describe('each player can attack', () => {
  let playerBoard;
  let enemyBoard;

  beforeEach(() => {
    playerBoard = Gameboard();
    enemyBoard = Gameboard();
    jest.spyOn(global.Math, 'random').mockReturnValue(0.19);
  })

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
})

  test('player attacks land on the enemy board', () => {
    playerOne.makeAttack([1,2], enemyBoard);

    expect(enemyBoard.gameboard[1][2]).toBe('miss');
    expect(playerBoard.gameboard[1][2]).toBe(null);

  })

  test('computer moves land on the player board', () => {
    computerPlayer.dumbComputerAttack(playerBoard);

    expect(playerBoard.gameboard[1][2]).toBe('miss');
    expect(enemyBoard.gameboard[1][2]).toBe(null);

  })
})
