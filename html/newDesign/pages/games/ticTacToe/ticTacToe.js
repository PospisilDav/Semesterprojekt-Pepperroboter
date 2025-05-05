var board;
var statusDisplay;
var restartBtn;
var newGameBtn;
var playerScoreDisplay;
var aiScoreDisplay;
var easyBtn;
var hardBtn;

// Game State Variables
var cells;
var isGameActive = true;
var isHardMode = false;
var playerScore = 0;
var aiScore = 0;

// Player Symbols
var PLAYER = "❌";
var AI = "⭕";

// All possible winning combinations (row, column and diagonal)
var winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize the game when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get references to DOM elements
    board = document.getElementById("board");
    statusDisplay = document.getElementById("status");
    restartBtn = document.getElementById("restartBtn");
    newGameBtn = document.getElementById("newGameBtn");
    playerScoreDisplay = document.getElementById("player-score");
    aiScoreDisplay = document.getElementById("ai-score");
    easyBtn = document.getElementById("easyBtn");
    hardBtn = document.getElementById("hardBtn");

    createBoard();

    // Difficulty toggle handlers
    easyBtn.addEventListener("click", function () {
        isHardMode = false;
        easyBtn.classList.add("active");
        hardBtn.className = hardBtn.className.replace(" active", "");
        easyBtn.setAttribute("aria-pressed", "true");
        hardBtn.setAttribute("aria-pressed", "false");
        restartGame();
    });

    hardBtn.addEventListener("click", function () {
        isHardMode = true;
        hardBtn.classList.add("active");
        easyBtn.className = easyBtn.className.replace(" active", "");
        hardBtn.setAttribute("aria-pressed", "true");
        easyBtn.setAttribute("aria-pressed", "false");
        restartGame();
    });

    // Game control buttons
    restartBtn.addEventListener("click", function () {
        isGameActive = true;
        statusDisplay.textContent = "Dein Zug (❌)";
        statusDisplay.className = "status-message";
        createBoard();
    });

    newGameBtn.addEventListener("click", function () {
        isGameActive = true;
        playerScore = 0;
        aiScore = 0;
        playerScoreDisplay.textContent = "0";
        aiScoreDisplay.textContent = "0";
        statusDisplay.textContent = "Dein Zug (❌)";
        statusDisplay.className = "status-message";
        createBoard();
    });
});

/**
 * Resets the game board while keeping scores intact
 */
function restartGame() {
    isGameActive = true;
    statusDisplay.textContent = "Dein Zug (❌)";
    statusDisplay.className = "status-message";
    createBoard();
}

/**
 * Creates the 3x3 game board and sets up event listeners
 */
function createBoard() {
    board.innerHTML = "";

    for (var i = 0; i < 9; i++) {
        var cell = document.createElement("div");
        cell.className = "board-cell";
        cell.setAttribute("data-index", i);
        cell.setAttribute("role", "button");
        cell.setAttribute("aria-label", "Feld " + (i + 1));
        cell.setAttribute("tabindex", "0");
        board.appendChild(cell);
    }
    cells = document.querySelectorAll(".board-cell");

    for (var i = 0; i < cells.length; i++) {
        // Mouse click handling
        cells[i].addEventListener("click", handlePlayerMove);

        // Keyboard accessibility
        cells[i].addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handlePlayerMove(e);
            }
        });
    }
}

/**
 * Handles the player's move and triggers AI response
 */
function handlePlayerMove(e) {
    var cell = e.target;
    var index = parseInt(cell.getAttribute("data-index"));

    if (!isGameActive || cell.hasAttribute("data-player")) return;

    makeMove(index, PLAYER);

    if (isGameActive) {
        // Prevent multiple moves while AI is "thinking"
        disableAllCells();

        // Visual feedback during AI turn
        statusDisplay.textContent = "Pepper denkt...";
        statusDisplay.className = "status-message thinking";

        setTimeout(handleAIMove, 600);
    }
}

/**
 * Temporarily disables all empty cells to prevent player interaction during AI turn
 */
function disableAllCells() {
    for (var i = 0; i < cells.length; i++) {
        if (!cells[i].hasAttribute("data-player")) {
            cells[i].classList.add("temporarily-disabled");
            cells[i].setAttribute("aria-disabled", "true");

            // Store and remove tabindex for accessibility
            cells[i].setAttribute("data-old-tabindex", cells[i].getAttribute("tabindex") || "0");
            cells[i].removeAttribute("tabindex");
        }
    }
}

/**
 * Re-enables empty cells after AI has made its move
 */
function enableAvailableCells() {
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].className.indexOf("temporarily-disabled") !== -1) {
            cells[i].className = cells[i].className.replace(" temporarily-disabled", "");
            cells[i].removeAttribute("aria-disabled");

            // Restore tabindex
            var oldTabindex = cells[i].getAttribute("data-old-tabindex");
            if (oldTabindex) {
                cells[i].setAttribute("tabindex", oldTabindex);
                cells[i].removeAttribute("data-old-tabindex");
            }
        }
    }
}

/**
 * Executes a move for the specified player and checks for game-ending conditions
 */
function makeMove(index, player) {
    var cell = cells[index];
    cell.setAttribute("data-player", player === PLAYER ? "X" : "O");
    cell.setAttribute("aria-label", (player === PLAYER ? "X" : "O") + " in Feld " + (index + 1));
    cell.setAttribute("aria-disabled", "true");
    cell.removeAttribute("tabindex");

    var winCombo = checkWinner(player);
    if (winCombo) {
        // Highlight the winning combination
        for (var i = 0; i < winCombo.length; i++) {
            cells[winCombo[i]].classList.add("winner");
        }

        // Update scores and UI for win condition
        if (player === PLAYER) {
            statusDisplay.textContent = "Du hast gewonnen! 🎉";
            statusDisplay.className = "status-message win";
            playerScore++;
            playerScoreDisplay.textContent = playerScore;
            createConfetti();
        } else {
            statusDisplay.textContent = "Pepper hat gewonnen!";
            statusDisplay.className = "status-message lose";
            aiScore++;
            aiScoreDisplay.textContent = aiScore;
        }

        isGameActive = false;
        return;
    }

    // Check for a draw
    var allTaken = true;
    for (var i = 0; i < cells.length; i++) {
        if (!cells[i].hasAttribute("data-player")) {
            allTaken = false;
            break;
        }
    }

    if (allTaken) {
        statusDisplay.textContent = "Unentschieden!";
        statusDisplay.className = "status-message draw";
        isGameActive = false;
        return;
    }

    // Continue game with next player's turn
    statusDisplay.textContent = (player === PLAYER) ? "Pepper denkt..." : "Dein Zug (❌)";
}

/**
 * Checks if the specified player has a winning combination on the board
 * Returns the winning combination array or false
 */
function checkWinner(player) {
    var values = [];
    for (var i = 0; i < cells.length; i++) {
        var dataPlayer = cells[i].getAttribute("data-player");
        values[i] = dataPlayer === "X" ? PLAYER : (dataPlayer === "O" ? AI : "");
    }

    for (var i = 0; i < winningCombinations.length; i++) {
        var comb = winningCombinations[i];
        var win = true;
        for (var j = 0; j < comb.length; j++) {
            if (values[comb[j]] !== player) {
                win = false;
                break;
            }
        }
        if (win) {
            return comb;
        }
    }
    return false;
}

/**
 * Handles AI's move based on difficulty level
 */
function handleAIMove() {
    if (!isGameActive) return;

    var values = [];
    for (var i = 0; i < cells.length; i++) {
        var dataPlayer = cells[i].getAttribute("data-player");
        values[i] = dataPlayer === "X" ? PLAYER : (dataPlayer === "O" ? AI : "");
    }

    var available = [];
    for (var i = 0; i < values.length; i++) {
        if (values[i] === "") {
            available.push(i);
        }
    }

    if (available.length === 0) return;

    var moveIndex;

    if (isHardMode) {
        // Hard mode: Use minimax for optimal moves
        moveIndex = getBestMove(values);
    } else {
        // Easy mode: Mix of strategic moves and randomness

        // 1. If AI can win, do it.
        for (var i = 0; i < available.length; i++) {
            var index = available[i];
            values[index] = AI;
            if (isWinning(values, AI)) {
                makeMove(index, AI);
                enableAvailableCells();
                return;
            }
            values[index] = "";
        }

        // 2. Block if player can win (but only 80% of the time to make it easier)
        if (Math.random() < 0.8) {
            for (var i = 0; i < available.length; i++) {
                var index = available[i];
                values[index] = PLAYER;
                if (isWinning(values, PLAYER)) {
                    makeMove(index, AI);
                    enableAvailableCells();
                    return;
                }
                values[index] = "";
            }
        }

        // 3. Otherwise, choose a mix of strategic and random moves
        if (Math.random() < 0.7) {
            // Strategic moves
            var preferredMoves = [4, 0, 2, 6, 8, 1, 3, 5, 7];
            for (var i = 0; i < preferredMoves.length; i++) {
                var index = preferredMoves[i];
                if (available.indexOf(index) !== -1) {
                    makeMove(index, AI);
                    enableAvailableCells();
                    return;
                }
            }
        } else {
            // Random move
            moveIndex = available[Math.floor(Math.random() * available.length)];
        }
    }

    if (moveIndex === undefined && available.length > 0) {
        moveIndex = available[Math.floor(Math.random() * available.length)];
    }

    makeMove(moveIndex, AI);
    enableAvailableCells();

    // At the end, update status and restore class
    statusDisplay.textContent = "Dein Zug (❌)";
    statusDisplay.className = "status-message";
}

/**
 * Checks if the specified player has a winning combination
 */
function isWinning(values, player) {
    for (var i = 0; i < winningCombinations.length; i++) {
        var comb = winningCombinations[i];
        var win = true;
        for (var j = 0; j < comb.length; j++) {
            if (values[comb[j]] !== player) {
                win = false;
                break;
            }
        }
        if (win) return true;
    }
    return false;
}

/**
 * Minimax algorithm for Hard mode
 */
function getBestMove(board) {
    var bestScore = -Infinity;
    var bestMove;

    for (var i = 0; i < 9; i++) {
        // Check if the spot is available
        if (board[i] === "") {
            board[i] = AI;
            var score = minimax(board, 0, false);
            board[i] = "";
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

/**
 * Minimax recursive function
 */
function minimax(board, depth, isMaximizing) {
    // Check terminal states
    if (isWinning(board, AI)) return 10 - depth;
    if (isWinning(board, PLAYER)) return depth - 10;

    // Check if the board is full (draw)
    var isFull = true;
    for (var i = 0; i < 9; i++) {
        if (board[i] === "") {
            isFull = false;
            break;
        }
    }
    if (isFull) return 0;

    if (isMaximizing) {
        var bestScore = -Infinity;
        for (var i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = AI;
                var score = minimax(board, depth + 1, false);
                board[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        var bestScore = Infinity;
        for (var i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = PLAYER;
                var score = minimax(board, depth + 1, true);
                board[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

/**
 * Celebration effect when player wins
 */
function createConfetti() {
    var confettiContainer = document.getElementById("confetti-container");
    confettiContainer.innerHTML = '';

    var colors = ['#52AD59', '#6DD1E9', '#07859E', '#09B637', '#FFD700'];

    for (var i = 0; i < 100; i++) {
        var confetti = document.createElement('div');
        confetti.className = 'confetti';

        // Randomize confetti appearance
        var color = colors[Math.floor(Math.random() * colors.length)];
        var size = Math.random() * 10 + 5;
        var left = Math.random() * 100;

        confetti.style.backgroundColor = color;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        confetti.style.left = left + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';

        // Add animation
        confetti.style.animation = 'fall ' + (Math.random() * 3 + 2) + 's linear forwards';
        confetti.style.animationDelay = Math.random() * 2 + 's';

        confettiContainer.appendChild(confetti);
    }
}
