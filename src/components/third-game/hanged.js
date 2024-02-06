// Importar estilos CSS
import './hanged.css';

import './hanged.css';

let gameStarted = false;

export function startHangedGame() {
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
  lettersContainer.addEventListener("click", handleLetterClick);

  const resultBox = document.createElement("div");
  resultBox.className = "result-box";

  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play again";
  playAgainButton.addEventListener("click", resetGame);

  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = "";
  gameContainer.appendChild(hangmanImage);
  gameContainer.appendChild(wordContainer);
  gameContainer.appendChild(attemptsContainer);
  gameContainer.appendChild(lettersContainer);
  gameContainer.appendChild(resultBox);
  gameContainer.appendChild(playAgainButton);

  function handleLetterClick(event) {
    if (remainingAttempts > 0) {
      const clickedElement = event.target;
      if (clickedElement.classList.contains("letter") && !clickedElement.classList.contains("disabled")) {
        const letter = clickedElement.dataset.letter;
        clickedElement.classList.add("disabled");

        if (selectedWord.includes(letter)) {
          guessedLetters.push(letter);
          wordContainer.innerHTML = createWordTemplate();

          if (!createWordTemplate().includes("_")) {
            displayResultMessage("Congratulations! You guessed the word.", true);
          }
        } else {
          remainingAttempts--;

          if (remainingAttempts >= 0) {
            attemptsContainer.textContent = `Remaining attempts: ${remainingAttempts}`;
            hangmanImage.src = `/hangman-${6 - remainingAttempts}.png`;
          }

          if (remainingAttempts === 0) {
            disableLetters(); // Deshabilitar letras después de agotar intentos
            displayResultMessage(`Oh no! You have lost.`, false);
          }
        }
      }
    }
  }

  function disableLetters() {
    // Deshabilitar todas las letras
    document.querySelectorAll(".letter").forEach(letter => {
      letter.classList.add("disabled");
    });
  }
  function displayResultMessage(message, isWin) {
    resultBox.innerHTML = `<p>${message}</p>`;
    if (!isWin) {
      resultBox.innerHTML += `<p>The correct word was: ${selectedWord}</p>`;
    }
    resultBox.classList.add(isWin ? "win" : "lose");
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
    selectedWord = words[Math.floor(Math.random() * words.length)];
    remainingAttempts = 6;
    guessedLetters = [];
    hangmanImage.src = "/hangman-0.png";
    wordContainer.innerHTML = createWordTemplate();
    attemptsContainer.textContent = `Remaining attempts: ${remainingAttempts}`;

    // Enable all letters again
    document.querySelectorAll(".letter").forEach(letter => {
      letter.classList.remove("disabled");
    });

    // Remove the result box content and styling
    resultBox.innerHTML = "";
    resultBox.classList.remove("win", "lose");
  }
}
