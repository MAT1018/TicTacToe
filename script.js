const startButton = document.getElementById('startButton');
const startContainer = document.getElementById('start-container');
const gameContainer = document.getElementById('game-container');
const cells = document.querySelectorAll('[data-cell]');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startButton.addEventListener('click', () => {
    startContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');
});

function handleClick(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);
    if (board[index] !== '' || !gameActive) return;
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        highlightWinningCells();
        messageElement.textContent = `${currentPlayer} Wins! 🎉`;
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        messageElement.textContent = "It's a Draw! 🤝";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

function highlightWinningCells() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => board[index] === currentPlayer)) {
            combination.forEach(index => {
                cells[index].classList.add('winning');
            });
        }
    });
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    messageElement.textContent = `Player X's Turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
