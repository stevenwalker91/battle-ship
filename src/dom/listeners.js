import * as display from "./display.js";
import * as index from '../index.js';


const welcomeForm = document.getElementById('welcome-form');
welcomeForm.addEventListener("submit", event => {
  event.preventDefault();
  display.hideStartScreen();
  display.displayGameBoards();

  const playerName = display.getPlayerName();
  display.addPlayerNameToUi(playerName);
  index.playGame(playerName);
})


