// Game variables
var moves = 0;
var timer = null;
var seconds = 0;
var flippedCards = [];
var matchedPairs = 0;
var totalPairs = 0;

// Card images from assets folder
var imageList = [
  "./assets/bike.svg",
  "./assets/car.svg",
  "./assets/flags.svg",
  "./assets/pawprint.svg",
  "./assets/rabbit.svg",
  "./assets/tshirt.svg",
  "./assets/turtle.svg",
];

// Duplicate icons for pairs and shuffle
var cardImages = imageList.concat(imageList)


// DOM elements
var gameBoard = document.getElementById("gameBoard");
var movesDisplay = document.getElementById("moves");
var timerDisplay = document.getElementById("timer");
var restartButton = document.getElementById("restartButton");
var playAgainButton = document.getElementById("playAgainButton");
var winOverlay = document.getElementById("winOverlay");
var finalTimeDisplay = document.getElementById("finalTime");
var finalMovesDisplay = document.getElementById("finalMoves");

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

function shuffleCards() {
  totalPairs = cardImages.length / 2;
  shuffleArray(cardImages)
}

// Initialize game
function initGame() {
  // Clear previous game
  gameBoard.innerHTML = "";
  moves = 0;
  seconds = 0;
  flippedCards = [];
  matchedPairs = 0;
  
  // Properly clear the timer first, then set to null
  if (timer) {
    clearInterval(timer);
  }
  timer = null;

  movesDisplay.textContent = moves;
  timerDisplay.textContent = formatTime(seconds);

  shuffleCards();

  // Create memory tiles
  for (var index = 0; index < cardImages.length; index++) {
    var imagePath = cardImages[index];
    var tile = document.createElement("button");
    tile.className = "memory-tile";
    tile.dataset.index = index;

    var inner = document.createElement("div");
    inner.className = "memory-tile__inner";

    var front = document.createElement("div");
    front.className = "memory-tile__front";

    // Create image element for the icon
    var img = document.createElement("img");
    img.src = imagePath;
    img.alt = "Memory card";
    img.className = "memory-card-image";

    front.appendChild(img);

    var back = document.createElement("div");
    back.className = "memory-tile__back";

    inner.appendChild(back);
    inner.appendChild(front);
    tile.appendChild(inner);

    tile.addEventListener("click", flipCard);
    gameBoard.appendChild(tile);
  }

  // Hide win overlay
  winOverlay.classList.remove("memory-overlay--active");
}

// Format time as MM:SS
function formatTime(totalSeconds) {
  var minutes = Math.floor(totalSeconds / 60).toString()//.padStart(2, '0');
  var seconds = (totalSeconds % 60).toString()//.padStart(2, '0');
  if (seconds.length === 1) {
    seconds = "0" + seconds
  }
  return minutes + ":" + seconds;
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
  if (moves === 0 && flippedCards.length === 0 && !timer) {
    timer = setInterval(updateTimer, 1000);
  }

  this.classList.add("flipped");
  flippedCards.push(this);

  // If we have 2 flipped cards, check for a match
  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;

    var card1 = flippedCards[0]
    var card2 = flippedCards[1]
    var img1 = card1.querySelector("img").src;
    var img2 = card2.querySelector("img").src;

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
      setTimeout(function() {
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
  setTimeout(function() {
    winOverlay.classList.add("memory-overlay--active");
  }, 500);
}

// Event listeners
restartButton.addEventListener("click", initGame);
playAgainButton.addEventListener("click", initGame);

// Initialize game on load
document.addEventListener("DOMContentLoaded", initGame);