const words = ['javascript', 'programacion', 'ahorcado', 'codigo', 'desarrollo'];
let selectedWord = '';
let guessedLetters = [];
let attempts = 6;

const wordElement = document.getElementById('word');
const lettersElement = document.getElementById('letters');
const statusElement = document.getElementById('status');
const historyList = document.getElementById('historyList');
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    attempts = 6;
    updateWordDisplay();
    updateStatus();
}

function updateWordDisplay() {
    const displayWord = selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
    wordElement.textContent = displayWord;
}

function updateStatus() {
    if (attempts <= 0) {
        statusElement.textContent = `¡Perdiste! La palabra era: ${selectedWord}`;
        addToHistory(false);
    } else if (selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
        statusElement.textContent = '¡Ganaste!';
        addToHistory(true);
    } else {
        statusElement.textContent = `Intentos restantes: ${attempts}`;
    }
}

function guessLetter() {
    const letter = guessInput.value.toLowerCase();
    guessInput.value = '';
    
    if (!guessedLetters.includes(letter) && /^[a-z]$/.test(letter)) {
        guessedLetters.push(letter);
        if (!selectedWord.includes(letter)) {
            attempts--;
        }
        updateWordDisplay();
        updateStatus();
    }
}

function addToHistory(won) {
    const now = new Date();
    const dateString = now.toLocaleString();
    const historyItem = document.createElement('li');
    historyItem.textContent = `Palabra: ${selectedWord}, Resultado: ${won ? 'Ganó' : 'Perdió'}, Fecha y Hora: ${dateString}`;
    historyList.appendChild(historyItem);
}

submitButton.addEventListener('click', guessLetter);
document.addEventListener('DOMContentLoaded', startGame);

