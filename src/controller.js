import * as display from "./dom/display.js";
import { Game } from './factories/game';
import { Player } from './factories/player.js';

// the live game will be held in this variable so it's methods and attributes can be acccessed from listeners
let playGame;
let activePlayer;

const orchestrateStartGame = () => {
  display.hideStartScreen();
  display.displayGameBoards();

  const playerName = display.getPlayerName();
  display.addPlayerNameToUi(playerName);
  playGame = Game(playerName);
  display.renderShips(playGame.playerBoard.getBoatPositions(), 'enemy');

}

const orchestrateAttack = (event) => {
  //this bit will kill the function if its the computer turn to prevent players spamming
  if(activePlayer === playGame.playerTwo) {
    return;
  }

  activePlayer = playGame.playerOne

  let loop = 0;
  // loop for each player's turn
  const makeAttack = () => {
    let attackPoint;
    let attack;
    let domBoard;
    let boardToAttack;
    let customFeedbackMessage;

    // define the attack parameters based on player
    if (activePlayer === playGame.playerOne) {
      boardToAttack = playGame.enemyBoard;
      attackPoint = [Number(event.target.dataset.row), Number(event.target.dataset.column)];
      attack = activePlayer.makeAttack(attackPoint, boardToAttack);
      domBoard = 'player';
      display.removeFieldFromPlay(attackPoint);
      customFeedbackMessage = ` You sunk their ${attack.shipType}!`
    } else {
      boardToAttack = playGame.playerBoard;
      attack = activePlayer.dumbComputerAttack(boardToAttack);
      domBoard = 'enemy';
      customFeedbackMessage = ` They sunk your ${attack.shipType}!`
    }
    
    let messageToPrint = `${activePlayer.name} ${attack.status} [${attack.coord[0]+1}, ${attack.coord[1]+1}].`

    if (attack.boatSunk) {
      messageToPrint += customFeedbackMessage;
    }

    display.renderAttack(attack.coord, attack.status, domBoard);
    display.printMoveToUi(messageToPrint, domBoard);

     // check for gameover
     if (boardToAttack.checkFleetSunk()) {
      playGame.gameOver(activePlayer);
      console.log('gameover')
    
      return;
    }

    if (activePlayer === playGame.playerTwo) {
      activePlayer = playGame.playerOne;
    } else {
      activePlayer = playGame.playerTwo;
    }
    
    loop++
    if (loop < 2) {
      setTimeout(makeAttack, 1250)
    }

  }

  makeAttack();
  
  
}

export {
  orchestrateStartGame,
  orchestrateAttack
}


