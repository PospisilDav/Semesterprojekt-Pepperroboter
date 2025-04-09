const words = [
  "schwarzwald", "hochschule", "furtwangen", "baden", "uhrenmuseum", "technik",
  "informatik", "campus", "bibliothek", "student", "entwicklung", "galgenmaennchen",
  "programmierung", "studium", "kaffeeautomat", "berg", "wetter", "projektarbeit"
];

let selectedWord = "";
let displayedWord = [];
let wrongGuesses = 0;
const maxGuesses = 6;

const wordDisplay = document.getElementById("wordDisplay");
const lettersDiv = document.getElementById("letters");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

function drawHangman(stage) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#333";

  // Grundstruktur
  ctx.beginPath();
  ctx.moveTo(10, 190); ctx.lineTo(190, 190); // Boden
  ctx.moveTo(50, 190); ctx.lineTo(50, 20);   // Pfosten
  ctx.lineTo(120, 20); ctx.lineTo(120, 40);  // Balken oben & Seil
  ctx.stroke();

  if (stage > 0) { // Kopf
    ctx.beginPath();
    ctx.arc(120, 55, 15, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (stage > 1) { // Körper
    ctx.beginPath();
    ctx.moveTo(120, 70); ctx.lineTo(120, 120);
    ctx.stroke();
  }
  if (stage > 2) { // linker Arm
    ctx.beginPath();
    ctx.moveTo(120, 80); ctx.lineTo(100, 100);
    ctx.stroke();
  }
  if (stage > 3) { // rechter Arm
    ctx.beginPath();
    ctx.moveTo(120, 80); ctx.lineTo(140, 100);
    ctx.stroke();
  }
  if (stage > 4) { // linkes Bein
    ctx.beginPath();
    ctx.moveTo(120, 120); ctx.lineTo(100, 150);
    ctx.stroke();
  }
  if (stage > 5) { // rechtes Bein
    ctx.beginPath();
    ctx.moveTo(120, 120); ctx.lineTo(140, 150);
    ctx.stroke();
  }
}

function startGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
  displayedWord = Array(selectedWord.length).fill("_");
  wrongGuesses = 0;
  message.textContent = "";
  wordDisplay.textContent = displayedWord.join(" ");
  drawHangman(wrongGuesses);

  lettersDiv.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const btn = document.createElement("button");
    btn.textContent = String.fromCharCode(i);
    btn.addEventListener("click", handleGuess);
    lettersDiv.appendChild(btn);
  }
}

function handleGuess(e) {
  const letter = e.target.textContent;
  e.target.disabled = true;

  if (selectedWord.includes(letter)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) {
        displayedWord[i] = letter;
      }
    }
    wordDisplay.textContent = displayedWord.join(" ");
    if (!displayedWord.includes("_")) {
      message.textContent = "🎉 Du hast gewonnen!";
      disableAllButtons();
    }
  } else {
    wrongGuesses++;
    drawHangman(wrongGuesses);
    if (wrongGuesses >= maxGuesses) {
      message.textContent = "❌ Verloren! Das Wort war: " + selectedWord;
      wordDisplay.textContent = selectedWord;
      disableAllButtons();
    }
  }
}

function disableAllButtons() {
  const buttons = lettersDiv.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);
}

restartBtn.addEventListener("click", startGame);

startGame();