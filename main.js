import { startGame } from './src/components/first-game/game.js';
import { startRockPaperScissors } from './src/components/second-game/rockPaperScissors.js';
import { startHangedGame } from './src/components/third-game/hanged.js';
import { createGameButtons } from './src/functions/buttons.js';
import './style.css';

const games = {
  'Three in a Row': startGame,
  'Rock Paper Scissors': startRockPaperScissors,
  'Hanged': startHangedGame,
};

const pageContainer = document.querySelector('.page-container');
const gameTitle = document.getElementById('games-btn');
const gameButtonsContainer = document.getElementById('game-buttons-container');
const gameContainer = document.getElementById('game-container');

gameTitle.addEventListener('click', () => {

  gameTitle.style.display = 'none';


  gameButtonsContainer.innerHTML = '';
  const buttons = createGameButtons(Object.keys(games), startGameByName);
  buttons.classList.add('game-buttons');
  gameButtonsContainer.appendChild(buttons);
});

let currentGame = null;

function startGameByName(gameName) {
  const selectedGame = games[gameName];

  if (currentGame) {
    gameContainer.removeChild(currentGame);
    currentGame = null;
  }

  if (gameName === 'Hanged') {

    startHangedGame(gameContainer);
  } else {
    const newGameContainer = selectedGame();

    if (!newGameContainer) {
      console.error('Error loading game:', gameName);
      return;
    }

    gameContainer.innerHTML = '';
    gameContainer.appendChild(newGameContainer);
    currentGame = newGameContainer;
  }
}
