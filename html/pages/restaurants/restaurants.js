"use strict";

var currentPlayingButton = null;

var PATH_PLAY_BUTTON = "../../assets/icons/play.svg";
var PATH_PAUSE_BUTTON = "../../assets/icons/pause.svg";

var pepperController = window.pepperController;

function setupCard(cardId, speakText) {
  var card = document.getElementById(cardId);
  var playImg = card.getElementsByClassName("play-icon")[0];
  if (!playImg) return;
  if (!card) return;

  card.addEventListener("click", function (e) {
    e.stopPropagation();
    if (currentPlayingButton === playImg) {
      playImg.src = PATH_PLAY_BUTTON;
      currentPlayingButton = null;
      pepperController.shutUp();
    } else {
      if (currentPlayingButton) {
        currentPlayingButton.src = PATH_PLAY_BUTTON;
        pepperController.shutUp();
      }
      playImg.src = PATH_PAUSE_BUTTON;
      currentPlayingButton = playImg;
      setTimeout(function () {
        pepperController.animatedSpeak("Boy", speakText);
      }, 800);  
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupCard(
    "regional",
    "Furtwangen lädt Genießer ein, die Vielfalt der Schwarzwälder Küche zu entdecken. Im Höhengasthaus \
    Kolmenhof werden traditionelle Spezialitäten wie Vesperplatten, Wildgerichte und Schwarzwälder Kirschtorte in ruhiger \
    Atmosphäre serviert – perfekt nach einer Wanderung zur Donauquelle. Das Gasthaus Bad verwöhnt seine Gäste mit \
    feiner, regionaler Küche und saisonalen Angeboten wie Spargel- oder Wildwochen."
  );

  setupCard(
    "international",
    "Auch internationale Spezialitäten kommen in Furtwangen nicht zu kurz. Im Ristorante Pizzeria Europa \
    genießen Gäste italienische Klassiker wie Pizza und Pasta. Der City Kebap und der Kebap Treff bieten frische türkische \
    Gerichte wie Döner, Dürüm und Falafel - perfekt für eine schnelle und leckere Mahlzeit."
  );

  setupCard(
    "cafe",
    "Für Kaffeeliebhaber und Naschkatzen hat Furtwangen einiges zu bieten. Wer feine Süßwaren schätzt, ist in der Confiserie Mayerhöfer genau richtig: \
    Hier erwarten die Gäste handgefertigte Pralinen, kunstvoll dekorierte Torten und aromatische Kaffeespezialitäten – alles in liebevoller Handarbeit und gemütlichem Ambiente. \
    Auch das Eiscafé Edelweiss ist ein beliebter Treffpunkt, besonders an warmen Tagen. \
    Mit hausgemachtem Eis, frischen Waffeln und echtem italienischem Flair lädt es zum Verweilen und Genießen ein – mitten im Herzen von Furtwangen."
  );

  var headerAvatar = document.querySelector(".header-avatar");
  if (headerAvatar) {
    headerAvatar.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Hier finden Sie Restaurants mit regionaler und internationaler Küche sowie gemütliche Cafés."
        );
      }, 800);
    });
  }
});
