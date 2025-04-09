const imageList = [
  "img/hund.png",
  "img/katze.png"
];

const gameBoard = document.getElementById("gameBoard");

let cardImages = [...imageList, ...imageList]; // Duplikate für Paare
cardImages.sort(() => 0.5 - Math.random());

cardImages.forEach((src, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.index = index;

  const inner = document.createElement("div");
  inner.className = "card-inner";

  const front = document.createElement("div");
  front.className = "card-front";
  const img = document.createElement("img");
  img.src = src;
  img.style.width = "100%";
  img.style.height = "100%";
  front.appendChild(img);

  const back = document.createElement("div");
  back.className = "card-back";

  inner.appendChild(back);
  inner.appendChild(front);
  card.appendChild(inner);
  gameBoard.appendChild(card);
});

// Memory Logik
let flippedCards = [];
gameBoard.addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (!card || card.classList.contains("matched") || flippedCards.includes(card)) return;

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector(".card-front img").src;
    const img2 = card2.querySelector(".card-front img").src;

    if (img1 === img2) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      flippedCards = [];
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }
});
