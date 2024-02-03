// game.js
import './game.css';

export function startGame() {
  let currentPlayer;
  let board;
  let gameOver;

  const container = document.createElement('div');
  container.id = 'game-container';

  const playerSelection = document.createElement('div');
  playerSelection.id = 'player-selection';

  const buttonX = createButton('Play with X', () => initializeGame('X'));
  const buttonO = createButton('Play with O', () => initializeGame('O'));

  playerSelection.appendChild(buttonX);
  playerSelection.appendChild(buttonO);

  container.appendChild(playerSelection);

  function initializeGame(player) {
    currentPlayer = player;
    board = Array(9).fill(null);
    gameOver = false;

    playerSelection.style.display = 'none';
    renderBoard();
  }

  function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
  }

  function renderBoard() {
    // Limpiar el contenedor antes de renderizar un nuevo tablero
    container.innerHTML = '';
    container.appendChild(playerSelection);

    const boardElement = document.createElement('div');
    boardElement.id = 'board';
    boardElement.style.display = 'grid';
    boardElement.style.gridTemplateColumns = 'repeat(3, 100px)';
    boardElement.style.gap = '10px';

    for (let i = 0; i < 9; i++) {
      const cell = createCell(i);
      boardElement.appendChild(cell);
    }

    container.appendChild(boardElement);
  }

  function createCell(index) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.setAttribute('data-index', index);
    cell.addEventListener('click', () => makeMove(index));
    cell.textContent = board[index];
    return cell;
  }

  function makeMove(index) {
    if (!gameOver && !board[index]) {
      board[index] = currentPlayer;
      renderBoard();
      checkWinner();
      checkTie();
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  function showMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    container.appendChild(messageElement);
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        gameOver = true;
        showMessage(`${currentPlayer} Wins!`);
        setTimeout(() => resetGame(), 2000); // Espera 2 segundos antes de reiniciar el juego
        return;
      }
    }
  }

  function checkTie() {
    if (!board.includes(null) && !gameOver) {
      gameOver = true;
      showMessage('Tie!');
      setTimeout(() => resetGame(), 2000); // Espera 2 segundos antes de reiniciar el juego
    }
  }

  function resetGame() {
    playerSelection.style.display = 'flex';
    renderBoard();
  }

  return container;
}