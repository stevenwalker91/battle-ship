import * as controller from '../controller.js';
import * as listeners from './listeners.js';

const hideStartScreen = () => {
  const screen = document.getElementById('welcome-screen');
  screen.classList.toggle('hide');
}

const displayGameBoards = () => {
  const boards = document.getElementById('board-container');
  boards.classList.toggle('hide');
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

const renderAttack = (attackPoint, result) => {
  const boardPiece = attackPoint;
  attackPoint.innerText = result;
}

const removeFieldFromPlay = (element) => {
  element.classList.toggle('available-tile');
  element.removeEventListener('click', listeners.attackFunction)
}


export {
  hideStartScreen,
  getPlayerName,
  displayGameBoards,
  addPlayerNameToUi,
  renderAttack,
  removeFieldFromPlay
}