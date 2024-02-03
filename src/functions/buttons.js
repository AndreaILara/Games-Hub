import './buttons.css';

export function createGameButtons(gameNames, onClickHandler) {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'game-buttons';

  gameNames.forEach((gameName) => {
    const button = document.createElement('button');
    button.textContent = gameName;
    button.addEventListener('click', () => onClickHandler(gameName));
    buttonsContainer.appendChild(button);
  });

  return buttonsContainer;
}
