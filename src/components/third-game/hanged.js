import './hanged.css';


let gameStarted = false;


export function startHangedGame() {
  if (gameStarted) {
    alert("The game has already started. Play again after finishing!")
    return;
  }

  gameStarted = true;


  const words = ["javascript", "hangman", "developer", "coding"];
  let selectedWord = words[Math.floor(Math.random() * words.length)];
  let remainingAttempts = 6;
  let guessedLetters = [];


  const hangmanImage = document.createElement("img");
  hangmanImage.id = "hangman-image";
  hangmanImage.src = "/hangman-0.png";

  const wordContainer = document.createElement("div");
  wordContainer.id = "word-container";
  wordContainer.innerHTML = createWordTemplate();

  const attemptsContainer = document.createElement("div");
  attemptsContainer.id = "attempts-container";
  attemptsContainer.textContent = `Remaining attempts: ${remainingAttempts}`;

  const lettersContainer = document.createElement("div");
  lettersContainer.id = "letters-container";
  lettersContainer.innerHTML = createAlphabetButtons();

  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play again";
  playAgainButton.addEventListener("click", resetGame);


  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = "";
  gameContainer.appendChild(hangmanImage);
  gameContainer.appendChild(wordContainer);
  gameContainer.appendChild(attemptsContainer);
  gameContainer.appendChild(lettersContainer);
  gameContainer.appendChild(playAgainButton);


  document.querySelectorAll(".letter").forEach(letter => {
    letter.addEventListener("click", () => handleLetterClick(letter.textContent));
  });


  function handleLetterClick(letter) {

    const clickedLetter = document.querySelector(`.letter[data-letter="${letter}"]`);
    clickedLetter.classList.add("disabled");


    if (selectedWord.includes(letter)) {

      guessedLetters.push(letter);
      wordContainer.innerHTML = createWordTemplate();


      if (!createWordTemplate().includes("_")) {
        alert("Congratulations! You guessed the word.");
        resetGame();
      }
    } else {

      remainingAttempts--;
      attemptsContainer.textContent = `Remaining attempts: ${remainingAttempts}`;


      hangmanImage.src = `/hangman-${6 - remainingAttempts}.png`;


      if (remainingAttempts === 0) {
        alert(`Oh no! You have lost. The word was "${selectedWord}".`);
        resetGame();
      }
    }
  }


  function createWordTemplate() {
    return selectedWord
      .split("")
      .map(letter =>
        guessedLetters.includes(letter) ? `<span class="word-letter">${letter}</span>` : `<span class="word-letter">_</span>`
      )
      .join("");
  }


  function createAlphabetButtons() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet
      .split("")
      .map(letter => `<button class="letter" data-letter="${letter}">${letter}</button>`)
      .join("");
  }


  function resetGame() {
    gameStarted = false;
    startHangedGame();
  }
}
