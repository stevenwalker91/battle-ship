

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


export {
  hideStartScreen,
  getPlayerName,
  displayGameBoards,
  addPlayerNameToUi
}