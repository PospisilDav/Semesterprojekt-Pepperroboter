var questions = [
  {
    question: "In welcher Region liegt Furtwangen?",
    answers: ["Allgäu", "Schwarzwald", "Bodensee", "Odenwald"],
    correct: 1
  },
  {
    question: "Wie heißt die Hochschule in Furtwangen?",
    answers: ["Uni Freiburg", "HS Furtwangen", "TU Karlsruhe", "FH Villingen"],
    correct: 1
  },
  {
    question: "Was befindet sich im Deutschen Uhrenmuseum?",
    answers: ["Autos", "Handys", "Uhren", "Bücher"],
    correct: 2
  },
  {
    question: "Was ist 5 + 8?",
    answers: ["13", "14", "12", "15"],
    correct: 0
  },
  {
    question: "Was ist 9 x 3?",
    answers: ["27", "18", "36", "21"],
    correct: 0
  },
  {
    question: "Wie heißt die Hauptstadt von Deutschland?",
    answers: ["München", "Stuttgart", "Berlin", "Hamburg"],
    correct: 2
  },
  {
    question: "Was ist 12 - 4?",
    answers: ["6", "7", "8", "9"],
    correct: 2
  },
  {
    question: "Welche Programmiersprache wird häufig an Hochschulen gelehrt?",
    answers: ["HTML", "Python", "Pascal", "Logo"],
    correct: 1
  },
  {
    question: "Was ist 6 : 2?",
    answers: ["1", "2", "3", "4"],
    correct: 2
  }
];

var currentIndex = 0;
var startTime = new Date().getTime(); // Track the start time
var resultTimeout; // Variable to store the timeout ID

var questionEl = document.getElementById("question");
var answerButtons = document.getElementById("answerButtons");
var resultEl = document.getElementById("result");
var nextBtn = document.getElementById("nextBtn");
var resultOverlay = document.getElementById("resultOverlay");
var resultContainer = document.getElementById("resultContainer");
var resultMessage = document.getElementById("resultMessage");
var resultIcon = document.getElementById("resultIcon");

function showQuestion() {
  // Add fade-out animation to the current question
  questionEl.classList.add("fade-out");
  answerButtons.classList.add("fade-out");

  // Wait for the fade-out animation to complete before updating the content
  setTimeout(function() {
    questionEl.classList.remove("fade-out");
    answerButtons.classList.remove("fade-out");

    var q = questions[currentIndex];

    // Shuffle the answers array
    var answersWithIndices = [];
    for (var i = 0; i < q.answers.length; i++) {
      answersWithIndices.push({
        answer: q.answers[i],
        index: i
      });
    }
    
    // Fisher-Yates shuffle algorithm
    for (var i = answersWithIndices.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = answersWithIndices[i];
      answersWithIndices[i] = answersWithIndices[j];
      answersWithIndices[j] = temp;
    }

    questionEl.textContent = q.question;
    answerButtons.innerHTML = "";

    for (var i = 0; i < answersWithIndices.length; i++) {
      var answerData = answersWithIndices[i];
      var btn = document.createElement("button");
      btn.textContent = answerData.answer;
      
      // Use an IIFE to create closure for index
      (function(idx) {
        btn.onclick = function() {
          checkAnswer(idx); // Pass the original index to checkAnswer
        };
      })(answerData.index);
      
      answerButtons.appendChild(btn);
    }

    // Add fade-in animation to the new question
    questionEl.classList.add("fade-in");
    answerButtons.classList.add("fade-in");

    // Remove the fade-in class after the animation completes
    setTimeout(function() {
      questionEl.classList.remove("fade-in");
      answerButtons.classList.remove("fade-in");
    }, 300);
  }, 300); // Match the duration of the fade-out animation
}

// Event listener to the result container to hide it on click
resultContainer.onclick = function() {
  // Clear the timeout to prevent duplicate actions
  clearTimeout(resultTimeout);

  // If the answer is correct, proceed to the next question
  if (resultContainer.classList.contains("correct")) {
    nextBtn.click();
  }

  // Hide the result container and overlay
  resultContainer.classList.remove("visible");
  resultContainer.classList.remove("correct");
  resultContainer.classList.remove("wrong");
  resultContainer.classList.add("hidden");
  resultOverlay.classList.remove("visible");
  resultOverlay.classList.add("hidden");
};

function showResultMessage(isCorrect) {
  resultMessage.innerHTML = isCorrect
    ? '<div class="result-message correct">' +
      '<div class="result-text">Gut gemacht!</div>' +
      '<p>Das war richtig!</p>' +
      '</div>'
    : '<div class="result-message wrong">' +
      '<div class="result-text">Leider falsch!</div>' +
      '<p>Versuch es nochmal.</p>' +
      '</div>';

  // Show the result container and overlay
  resultContainer.classList.remove("hidden");
  resultContainer.classList.add("visible");
  if (isCorrect) {
    resultContainer.classList.add("correct");
  } else {
    resultContainer.classList.add("wrong");
  }
  resultOverlay.classList.remove("hidden");
  resultOverlay.classList.add("visible");

  // Set a timeout to hide the result container and proceed to the next question
  resultTimeout = setTimeout(function() {
    resultContainer.classList.remove("visible");
    resultContainer.classList.remove("correct");
    resultContainer.classList.remove("wrong");
    resultContainer.classList.add("hidden");
    resultOverlay.classList.remove("visible");
    resultOverlay.classList.add("hidden");

    // If the answer is correct, proceed to the next question
    if (isCorrect) {
      nextBtn.click();
    }
  }, 2000);
}

function checkAnswer(index) {
  var correct = questions[currentIndex].correct;
  var isCorrect = index === correct;

  showResultMessage(isCorrect);

  if (isCorrect) {
    // Disable all buttons if the answer is correct
    var buttons = answerButtons.children;
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  } else {
    // Find the button with the wrong answer
    var buttons = answerButtons.children;
    for (var i = 0; i < buttons.length; i++) {
      // Check if this button matches the clicked index
      if (buttons[i].textContent === questions[currentIndex].answers[index]) {
        buttons[i].classList.add("wrong-answer");
        setTimeout(function(element) {
          return function() {
            element.classList.remove("wrong-answer");
          };
        }(buttons[i]), 1000);
        break;
      }
    }
  }
}

nextBtn.onclick = function() {
  currentIndex++;
  if (currentIndex >= questions.length) {
    var endTime = new Date().getTime(); // Calculate the end time
    var totalTime = Math.floor((endTime - startTime) / 1000); // Time in seconds

    // Display the end message with total time
    questionEl.textContent = "🎉 Du hast alle Fragen beantwortet!";
    answerButtons.innerHTML =
      '<p>Deine Zeit: <strong>' + totalTime + ' Sekunden</strong></p>' +
      '<button id="restartBtn" class="control-btn">Quiz neu starten</button>' +
      '<button id="backToGamesBtn" class="control-btn">Zurück zu den Spielen</button>';
    resultEl.textContent = "";
    nextBtn.style.display = "none"; // Hide the next button

    // Add event listeners for the new buttons
    document.getElementById("restartBtn").onclick = function() {
      currentIndex = 0;
      startTime = new Date().getTime(); // Reset the start time
      showQuestion();
      nextBtn.style.display = ""; // Show the next button again
    };

    document.getElementById("backToGamesBtn").onclick = function() {
      window.location.href = "../../../pages/games/games.html"; // Redirect to the games menu
    };
  } else {
    showQuestion();
  }
};

// Initialize the first question
showQuestion();