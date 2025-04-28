const questions = [
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

const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");

function showQuestion() {
  const q = questions[currentIndex];
  questionEl.textContent = q.question;
  answerButtons.innerHTML = "";
  resultEl.textContent = "";
  for (let i = 0; i < q.answers.length; i++) {
    const ans = q.answers[i];
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = function() { checkAnswer(i) }
    answerButtons.appendChild(btn);
  }
}

function checkAnswer(index) {
  const correct = questions[currentIndex].correct;
  if (index === correct) {
    resultEl.textContent = "✅ Richtig!";
    resultEl.style.color = "green";
  } else {
    resultEl.textContent = "❌ Leider falsch.";
    resultEl.style.color = "red";
  }

  for (const btn of answerButtons.children) {
    btn.disabled = true;
  }

}

nextBtn.onclick = function() {
  {
    currentIndex++;
    if (currentIndex >= questions.length) {
      questionEl.textContent = "🎉 Du hast alle Fragen beantwortet!";
      answerButtons.innerHTML = "";
      resultEl.textContent = "";
      nextBtn.disabled = true;
    } else {
      showQuestion();
    }
  }
}

showQuestion();