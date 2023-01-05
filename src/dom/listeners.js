import * as display from "./display.js";
import { Game } from '../factories/game';
import { Player } from '../factories/player.js';
import * as controller from '../controller.js';

let attackFunction;

document.addEventListener('DOMContentLoaded', () => {
  
  // listen for user starting game
  const welcomeForm = document.getElementById('welcome-form');
  welcomeForm.addEventListener("submit", event => {
    event.preventDefault();
    controller.orchestrateStartGame();

  })

  attackFunction = (event) => {
    controller.orchestrateAttack(event);
  }

  // listen for attacks by the user on enemy board
  const boardTiles = document.querySelectorAll('.available-tile');
  boardTiles.forEach(tile => {
    tile.addEventListener('click', attackFunction)
  })


})

export {
  attackFunction
}




