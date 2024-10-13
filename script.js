// Variables
let board;
let turn;
let gameOver;
let currentPlayer;

// Initialize game
function initGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    turn = 0;
    gameOver = false;
    currentPlayer = "X"; // X always starts
    document.getElementById("status").textContent = `Current Player: ${currentPlayer}`;
    renderBoard();
}

// Render the board based on current state
function renderBoard() {
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = board[i];
        if (board[i] === "X") {
            cells[i].style.color = "#e74c3c"; // Red color for X
        } else if (board[i] === "O") {
            cells[i].style.color = "#3498db"; // Blue color for O
        } else {
            cells[i].style.color = "#333"; // Default color
        }
    }
}

// Place a mark on the board
function placeMark(index) {
    if (gameOver || board[index] !== "") return;

    board[index] = currentPlayer;
    renderBoard();

    if (checkWin()) {
        document.getElementById("status").textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
    } else if (checkDraw()) {
        document.getElementById("status").textContent = "It's a draw!";
        gameOver = true;
    } else {
        turn++;
        currentPlayer = turn % 2 === 0 ? "X" : "O";
        document.getElementById("status").textContent = `Current Player: ${currentPlayer}`;
    }
}

// Check if there's a winner
function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winConditions.some((condition) => {
        const [a, b, c] = condition;
        return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
    });
}

// Check if it's a draw
function checkDraw() {
    return turn === 8;
}

// Reset the board
function resetBoard() {
    initGame();
}

// Initialize game on load
document.addEventListener("DOMContentLoaded", initGame);
