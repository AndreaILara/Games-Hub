import './rockPaperScissors.css';

export function startRockPaperScissors() {
  const container = document.createElement('div');
  container.className = 'game-container';
  container.id = 'rock-paper-scissors-container';

  const header = document.createElement('h2');
  header.textContent = 'Rock, Paper or Scissors';
  container.appendChild(header);

  const choices = ['Rock', 'Paper', 'Scissors'];
  let userWins = parseInt(localStorage.getItem('userWins')) || 0;
  let computerWins = parseInt(localStorage.getItem('computerWins')) || 0;

  const userScoreDisplay = document.createElement('p');
  const computerScoreDisplay = document.createElement('p');
  const resultDisplay = document.createElement('p');

  updateUserScore();
  updateComputerScore();

  const choicesContainer = document.createElement('div');
  choicesContainer.className = 'choices-container';

  choices.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = getEmoji(choice);
    button.addEventListener('click', () => playRound(choice));
    choicesContainer.appendChild(button);
  });

  container.appendChild(userScoreDisplay);
  container.appendChild(computerScoreDisplay);
  container.appendChild(choicesContainer);
  container.appendChild(resultDisplay);

  function getEmoji(choice) {
    switch (choice) {
      case 'Rock':
        return '👊';
      case 'Paper':
        return '🖐';
      case 'Scissors':
        return '✌';
      default:
        return '';
    }
  }

  function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    const randomResult = Math.floor(Math.random() * 3); // 0 para empate, 1 para victoria, 2 para derrota

    choicesContainer.querySelectorAll('button').forEach(button => button.classList.remove('selected'));
    const userButton = Array.from(choicesContainer.querySelectorAll('button')).find(button => getEmoji(userChoice) === button.textContent);
    userButton.classList.add('selected');

    setTimeout(() => {
      userButton.classList.remove('selected');
    }, 500);

    let result = getResult(userChoice, computerChoice);

    updateUserScore();
    updateComputerScore();
    saveGameData();

    resultDisplay.textContent = `You chose ${getEmoji(userChoice)}. The machine chose ${getEmoji(computerChoice)}. Result: ${result.toUpperCase()}.`;
  }

  function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  function getResult(user, computer) {
    if (user === computer) {
      return 'Tie';
    }

    if (
      (user === 'Rock' && computer === 'Scissors') ||
      (user === 'Paper' && computer === 'Rock') ||
      (user === 'Scissors' && computer === 'Paper')
    ) {
      return 'Wins';
    }

    return 'Lose';
  }

  function updateUserScore() {
    userScoreDisplay.textContent = `Your victories: ${userWins}`;
    localStorage.setItem('userWins', userWins.toString());
  }

  function updateComputerScore() {
    computerScoreDisplay.textContent = `Machine victories: ${computerWins}`;
    localStorage.setItem('computerWins', computerWins.toString());
  }

  function saveGameData() {
    // Implementa la lógica de guardado de datos si es necesario
  }

  return container;
}
