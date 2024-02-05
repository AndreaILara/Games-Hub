import './rockPaperScissors.css';

export function startRockPaperScissors() {
  const container = document.createElement('div');
  container.className = 'game-container';
  container.id = 'rock-paper-scissors-container';

  const header = document.createElement('h2');
  header.textContent = 'Rock, Paper or Scissors';
  container.appendChild(header);

  const choices = ['Rock 👊', 'Paper 🖐', 'Scissors ✌'];
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
    button.textContent = choice;
    button.addEventListener('click', () => playRound(choice));
    choicesContainer.appendChild(button);
  });

  container.appendChild(userScoreDisplay);
  container.appendChild(computerScoreDisplay);
  container.appendChild(choicesContainer);
  container.appendChild(resultDisplay);

  function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    const result = getResult(userChoice, computerChoice);


    choicesContainer.querySelectorAll('button').forEach(button => button.classList.remove('selected'));
    const userButton = Array.from(choicesContainer.querySelectorAll('button')).find(button => button.textContent.includes(userChoice));
    userButton.classList.add('selected');

    setTimeout(() => {
      userButton.classList.remove('selected');
    }, 500);


    const machineChoice = getMachineChoice();

    const adjustedResult = getResult(userChoice, machineChoice);

    switch (adjustedResult) {
      case 'Wins':
        userWins++;
        break;
      case 'Lose':
        computerWins++;
        break;
    }

    updateUserScore();
    updateComputerScore();
    saveGameData();

    resultDisplay.textContent = `You chose ${userChoice}. The machine chose ${machineChoice}. Result: ${adjustedResult.toUpperCase()}.`;
  }

  function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  function getMachineChoice() {

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

  }

  return container;
}
