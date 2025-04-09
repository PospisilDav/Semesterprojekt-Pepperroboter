// Game variables
let moves = 0;
let timer = null;
let seconds = 0;
let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 0;

// Card images from assets folder
const imageList = [
  "./assets/bike.svg",
  "./assets/car.svg",
  "./assets/flags.svg",
  "./assets/pawprint.svg",
  "./assets/rabbit.svg",
  "./assets/tshirt.svg",
  "./assets/turtle.svg",
];

// Duplicate icons for pairs and shuffle
let cardImages = [...imageList, ...imageList];
totalPairs = cardImages.length / 2;
cardImages.sort(() => 0.5 - Math.random());

// DOM elements
const gameBoard = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const restartButton = document.getElementById("restartButton");
const playAgainButton = document.getElementById("playAgainButton");
const winOverlay = document.getElementById("winOverlay");
const finalTimeDisplay = document.getElementById("finalTime");
const finalMovesDisplay = document.getElementById("finalMoves");

// Initialize game
function initGame() {
  // Clear previous game
  gameBoard.innerHTML = "";
  moves = 0;
  seconds = 0;
  flippedCards = [];
  matchedPairs = 0;
  
  movesDisplay.textContent = moves;
  timerDisplay.textContent = formatTime(seconds);
  
  if (timer) clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
  
  // Shuffle cards
  cardImages.sort(() => 0.5 - Math.random());
  
  // Create memory tiles
  cardImages.forEach((imagePath, index) => {
    const tile = document.createElement("button");
    tile.className = "memory-tile";
    tile.dataset.index = index;
    
    const inner = document.createElement("div");
    inner.className = "memory-tile__inner";
    
    const front = document.createElement("div");
    front.className = "memory-tile__front";
    
    // Create image element for the icon
    const img = document.createElement("img");
    img.src = imagePath;
    img.alt = "Memory card";
    img.className = "memory-card-image";
    
    front.appendChild(img);
    
    const back = document.createElement("div");
    back.className = "memory-tile__back";
    
    inner.appendChild(back);
    inner.appendChild(front);
    tile.appendChild(inner);
    
    tile.addEventListener("click", flipCard);
    gameBoard.appendChild(tile);
  });
  
  // Hide win overlay
  winOverlay.classList.remove("memory-overlay--active");
}

// Format time as MM:SS
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// Update timer
function updateTimer() {
  seconds++;
  timerDisplay.textContent = formatTime(seconds);
}

// Flip card when clicked
function flipCard() {
  // Ignore if already flipped or matched
  if (this.classList.contains("flipped") || 
      this.classList.contains("matched") || 
      flippedCards.length >= 2) {
    return;
  }
  
  // Start timer on first card flip
  if (moves === 0 && flippedCards.length === 0) {
    timer = setInterval(updateTimer, 1000);
  }
  
  this.classList.add("flipped");
  flippedCards.push(this);
  
  // If we have 2 flipped cards, check for a match
  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;
    
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector("img").src;
    const img2 = card2.querySelector("img").src;
    
    if (img1 === img2) {
      // Match found
      card1.classList.add("matched");
      card2.classList.add("matched");
      flippedCards = [];
      
      matchedPairs++;
      
      // Check for win
      if (matchedPairs === totalPairs) {
        endGame();
      }
    } else {
      // No match, flip back after delay
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }
}

// End game
function endGame() {
  clearInterval(timer);
  
  // Update win overlay with stats
  finalTimeDisplay.textContent = formatTime(seconds);
  finalMovesDisplay.textContent = moves;
  
  // Show win overlay after a small delay
  setTimeout(() => {
    winOverlay.classList.add("memory-overlay--active");
  }, 500);
}

// Event listeners
restartButton.addEventListener("click", initGame);
playAgainButton.addEventListener("click", initGame);

// Initialize game on load
document.addEventListener("DOMContentLoaded", initGame);