import * as display from "./dom/display.js";
import { Game } from './factories/game';
import { Player } from './factories/player.js';

// the live game will be held in this variable so it's methods and attributes can be acccessed from listeners
let playGame;


const orchestrateStartGame = () => {
  display.hideStartScreen();
  display.displayGameBoards();

  const playerName = display.getPlayerName();
  display.addPlayerNameToUi(playerName);
  playGame = Game(playerName);

}

const orchestrateAttack = (event) => {
  const attackPoint = [event.target.dataset.row, event.target.dataset.column]
    const attack = playGame.playerOne.makeAttack(attackPoint, playGame.enemyBoard);
    display.renderAttack(event.target, attack);
    display.removeFieldFromPlay(event.target);
}

export {
  orchestrateStartGame,
  orchestrateAttack
}


