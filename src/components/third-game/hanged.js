import './hanged.css';


let gameStarted = false; // Variable para controlar si el juego ya ha comenzado

// Función para inicializar el juego de ahorcado
export function startHangedGame() {
  if (gameStarted) {
    alert("The game has already started. Play again after finishing!")
    return;
  }

  gameStarted = true;

  // Variables
  const words = ["javascript", "hangman", "developer", "coding"];
  let selectedWord = words[Math.floor(Math.random() * words.length)];
  let remainingAttempts = 6;
  let guessedLetters = [];

  // Elementos DOM
  const hangmanImage = document.createElement("img");
  hangmanImage.id = "hangman-image";
  hangmanImage.src = "src/components/third-game/images/hangman-0.png";

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

  // Agregar elementos al contenedor existente
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = ""; // Limpiar contenido anterior
  gameContainer.appendChild(hangmanImage);
  gameContainer.appendChild(wordContainer);
  gameContainer.appendChild(attemptsContainer);
  gameContainer.appendChild(lettersContainer);
  gameContainer.appendChild(playAgainButton);

  // Agregar eventos de clic a las letras
  document.querySelectorAll(".letter").forEach(letter => {
    letter.addEventListener("click", () => handleLetterClick(letter.textContent));
  });

  // Función para manejar el clic en una letra
  function handleLetterClick(letter) {
    // Desactivar la letra
    const clickedLetter = document.querySelector(`.letter[data-letter="${letter}"]`);
    clickedLetter.classList.add("disabled");

    // Verificar si la letra está en la palabra
    if (selectedWord.includes(letter)) {
      // Actualizar la palabra
      guessedLetters.push(letter);
      wordContainer.innerHTML = createWordTemplate();

      // Verificar si el jugador ha ganado
      if (!createWordTemplate().includes("_")) {
        alert("Congratulations! You guessed the word.");
        resetGame();
      }
    } else {
      // Reducir intentos restantes
      remainingAttempts--;
      attemptsContainer.textContent = `Remaining attempts: ${remainingAttempts}`;

      // Actualizar la imagen del ahorcado
      hangmanImage.src = `src/components/third-game/images/hangman-${6 - remainingAttempts}.png`;

      // Verificar si el jugador ha perdido
      if (remainingAttempts === 0) {
        alert(`Oh no! You have lost. The word was "${selectedWord}".`);
        resetGame();
      }
    }
  }

  // Función para crear el template de la palabra con letras adivinadas
  function createWordTemplate() {
    return selectedWord
      .split("")
      .map(letter =>
        guessedLetters.includes(letter) ? `<span class="word-letter">${letter}</span>` : `<span class="word-letter">_</span>`
      )
      .join("");
  }

  // Función para crear los botones de las letras del alfabeto
  function createAlphabetButtons() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet
      .split("")
      .map(letter => `<button class="letter" data-letter="${letter}">${letter}</button>`)
      .join("");
  }

  // Función para reiniciar el juego
  function resetGame() {
    gameStarted = false;
    startHangedGame();
  }
}
