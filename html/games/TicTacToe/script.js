
const board = document.getElementById("board");
const statusDisplay = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let cells;
let isGameActive = true;

const PLAYER = "❌";
const AI = "⭕";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    board.appendChild(cell);
  }
  cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.addEventListener("click", handlePlayerMove));
}

function handlePlayerMove(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (!isGameActive || cell.classList.contains("taken")) return;

  makeMove(index, PLAYER);
  if (isGameActive) {
    setTimeout(handleAIMove, 500);
  }
}

function makeMove(index, player) {
  const cell = cells[index];
  cell.textContent = player;
  cell.classList.add("taken");

  if (checkWinner(player)) {
    statusDisplay.textContent = player + " gewinnt!";
    isGameActive = false;
    return;
  }

  if ([...cells].every(cell => cell.classList.contains("taken"))) {
    statusDisplay.textContent = "Unentschieden!";
    isGameActive = false;
    return;
  }

  statusDisplay.textContent = player === PLAYER ? "Computer denkt..." : "Dein Zug (❌)";
}

function checkWinner(player) {
  const values = [...cells].map(cell => cell.textContent);
  return winningCombinations.some(comb =>
    comb.every(index => values[index] === player)
  );
}

function handleAIMove() {
  const values = [...cells].map(cell => cell.textContent);
  const available = values
    .map((val, idx) => (val === "" ? idx : null))
    .filter(val => val !== null);

  // 1. Wenn AI gewinnen kann, mache es
  for (let index of available) {
    values[index] = AI;
    if (isWinning(values, AI)) {
      makeMove(index, AI);
      return;
    }
    values[index] = "";
  }

  // 2. Wenn Spieler gewinnen kann, blockiere es
  for (let index of available) {
    values[index] = PLAYER;
    if (isWinning(values, PLAYER)) {
      makeMove(index, AI);
      return;
    }
    values[index] = "";
  }

  // 3. Sonst wähle eine "gute" Position: Mitte > Ecke > Seite
  const preferredMoves = [4, 0, 2, 6, 8, 1, 3, 5, 7];
  for (let index of preferredMoves) {
    if (available.includes(index)) {
      makeMove(index, AI);
      return;
    }
  }
}

function isWinning(values, player) {
  return winningCombinations.some(comb =>
    comb.every(index => values[index] === player)
  );
}

restartBtn.addEventListener("click", () => {
  isGameActive = true;
  statusDisplay.textContent = "Dein Zug (❌)";
  createBoard();
});

createBoard();
