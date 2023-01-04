import * as display from "./display.js";
import { Game } from '../factories/gameflow';
import { Player } from '../factories/player.js';

// the live game will be held in this variable so it's methods and attributes can be acccessed from listeners
let playGame;

// listen for user starting game
const welcomeForm = document.getElementById('welcome-form');
welcomeForm.addEventListener("submit", event => {
  event.preventDefault();
  display.hideStartScreen();
  display.displayGameBoards();

  const playerName = display.getPlayerName();
  display.addPlayerNameToUi(playerName);
  playGame = Game(playerName);
})

// listen for attacks by the user on enemy board
const boardTiles = document.querySelectorAll('.available-tile');
boardTiles.forEach(tile => {
  tile.addEventListener('click', event => {
    const attackPoint = [event.target.dataset.row, event.target.dataset.column]
    playGame.playerOne.makeAttack(attackPoint, playGame.enemyBoard);

    display.renderAttack(playGame.enemyBoard.gameboard);
  })
})


