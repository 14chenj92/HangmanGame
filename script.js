const wordDisplay = document.querySelector(".word-display");
const wrongGuesses = document.querySelector(".wrong-guesses");
const letters = document.querySelector(".letters");
const hangmanImage = document.querySelector(".hangman-update");

const words = ["application", "programming", "javascript", "python"];

let randomWord = "";
let correctLetters = [];
let guessCount = 0;
let maxGuesses = 6;

// obtains random word from words array
const getWord = () => {
  randomWord = words[Math.floor(Math.random() * words.length)];
  console.log(randomWord);
};

// displays wrong guesses on screen
const guessText = () => {
  wrongGuesses.innerHTML = `Wrong guesses: ${guessCount} / ${maxGuesses}`;
  hangmanImage.src = "./images/hangman-" + guessCount + ".svg";
};

// displays letters on screen
const displayLetters = () => {
  let letterBtns = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `
        <button
          class=""
          id='` +
        letter +
        `'
          onClick="guessLetters('` +
        letter +
        `')">
          ` +
        letter.toUpperCase() + 
        `
        </button>`
    )
    .join("");

  letters.innerHTML = letterBtns;
};

// checks if letter is right or wrong
const guessLetters = (chosenLetter) => {
  correctLetters.indexOf(chosenLetter) === -1 ? correctLetters.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (randomWord.indexOf(chosenLetter) >= 0) {
    guessedWord();
    gameWin();
  } else if (randomWord.indexOf(chosenLetter) === -1) {
    guessCount++;
    guessText();
    gameLose();
  }
}

// displays underscores + correctLetters
const guessedWord = () => {
  wordDisplay.innerHTML = randomWord.split("").map(letter => (correctLetters.indexOf(letter) >= 0 ? letter : " _ ")).join("");
};

// win/lose game functions
const gameWin = () => {
  if (wordDisplay.innerHTML === randomWord) 
  return gameOver(true)
};

const gameLose = () => {
  if (guessCount === maxGuesses) 
  return gameOver(false)
};

// modal for after game
const gameOver = (result) => {
Swal.fire({
  title: result 
  ? `<div style="font-family: Dosis; font-size: 32px; color: green;">Congrats!</div>` 
  : `<div style="font-family: Dosis; font-size: 32px; color: red;">Gameover!</div>`,
  html: result 
  ? `<div style="font-family: Dosis; font-size: 18px;">You found the word: ${randomWord.charAt(0).toUpperCase() + randomWord.slice(1)}</div>` 
  : `<div style="font-family: Dosis; font-size: 18px;">The correct word was: ${randomWord.charAt(0).toUpperCase() + randomWord.slice(1)}</div>`,
  icon: result 
  ? 'success' 
  : 'error',
  showConfirmButton: true,
  confirmButtonText: `<div style="font-family: Dosis;">Play Again</div>`,
  allowOutsideClick: false, 
}).then((result) => {
  if (result.isConfirmed) {
    resetGame(); 
  }
})};

// refresh page
const resetGame = () => {
  location.reload()
};

// call functions
getWord();
guessedWord();
displayLetters();
guessText();

// stop typing animation
const h1Element = document.querySelector('.hangman-img h1');

setTimeout(() => {
  h1Element.style.borderRight = "none"; 
}, 5000);

