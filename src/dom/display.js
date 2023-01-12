import * as controller from '../controller.js';
import * as listeners from './listeners.js';

const hideStartScreen = () => {
  const screen = document.getElementById('welcome-screen');
  screen.classList.toggle('hide');
}

const displayGameBoards = () => {
  const boards = document.getElementById('board-container');
  const feedback = document.getElementById('feedback-container');
  boards.classList.toggle('hide');
  feedback.classList.toggle('hide')
}

const getPlayerName = () => {
  const input = document.getElementById('name');
  const playerName = input.value;
  return playerName;
}

const addPlayerNameToUi= (name) => {
  const nameSpan = document.getElementById('playerName');
  nameSpan.innerText = name;
}

const renderAttack = (attackPoint, result, domBoard) => {
  const boardPiece = findGamePiece(domBoard, attackPoint);

  if (result === 'missed') {
    boardPiece.innerHTML = '&bull;';
    boardPiece.classList.toggle('missed');
  }

  if (result === 'hit') {
    boardPiece.innerHTML = '&#10005;'
    boardPiece.classList.toggle('hit');
  }
  
}

const removeFieldFromPlay = (coords) => {
  const element = findGamePiece('player', coords);
  element.classList.toggle('available-tile');
  element.removeEventListener('click', listeners.attackFunction)
}

const renderShips = (positions, player) => {
  for (const boardPosition of positions) {
    const elementToUpdate = findGamePiece(player, boardPosition)
    elementToUpdate.classList.toggle('boat-position')
  }
}

const findGamePiece = (board, coords) => {
  const row = coords[0];
  const col = coords[1];
  let domBoard; 

  if (board === 'player') {
    domBoard = document.getElementById('enemy-board');
  } else {
    domBoard = document.getElementById('player-board');
  }
  return domBoard.querySelector(`:scope > [data-row="${row}"][data-column="${col}"]`);
}

const printMoveToUi = (message, player) => {
  
  const computerFeedback = document.getElementById('computer-feedback');
  const playerFeedback = document.getElementById('player-feedback');
  
  computerFeedback.innerText = '';

  let feedback;
  if (player ===  'player') {
    feedback = playerFeedback;
  } else {
    feedback = computerFeedback;
  }
  
  const speed = 40;
  const messageArray = [message];
  let textPosition = 0;

  const typeWriter = () => {
    feedback.innerHTML = messageArray[0].substring(0, textPosition) + '<span class="blinker">\u25AE</span>'
    if(textPosition++ != messageArray[0].length) {
      setTimeout(typeWriter, speed)
    } else {
      const playerBlinker =  playerFeedback.querySelector(':scope > .blinker');
      if (playerBlinker) playerBlinker.remove();
    }
    
  }

  typeWriter();

}

const toggleModal = () => {
  const modal = document.getElementById('modal');
  modal.classList.toggle('hide');
}

const addWinnerToModal = (winner) => {
  const winnerField = document.getElementById('winner-message');
  winnerField.innerText = `${winner} won!`
}

const resetGameBoard = () => {
  const gamePieces = document.querySelectorAll('.board-space');

  gamePieces.forEach(piece => {
    piece.classList.remove('boat-position', 'hit', 'missed');
    piece.innerText = '';
    if (piece.parentElement.id === 'enemy-board' && !piece.classList.contains('available-tile')) {
      piece.classList.add('available-tile');
      piece.addEventListener('click', listeners.attackFunction)
    }

  })
}
  



export {
  hideStartScreen,
  getPlayerName,
  displayGameBoards,
  addPlayerNameToUi,
  renderAttack,
  removeFieldFromPlay,
  renderShips,
  printMoveToUi,
  toggleModal,
  addWinnerToModal,
  resetGameBoard
}