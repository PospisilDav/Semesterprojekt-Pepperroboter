"use strict";

var currentPlayingButton = null;

var PATH_PLAY_BUTTON = "../../assets/icons/play.svg";
var PATH_PAUSE_BUTTON = "../../assets/icons/pause.svg";

var pepperController = window.pepperController;

/**
 * dynamically render the info cards and add event listeners
 */
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
    "OutdoorNatur",
    "Furtwangen ist ideal für alle, die draußen aktiv sein möchten. Eine Wanderung zum Brend-Turm bietet \
    fantastische Ausblicke über den Schwarzwald. Für Abenteuer auf zwei Rädern laden die Mountainbike-Strecken am \
    Linach-Damm ein. Entspannung und Naturerlebnis gibt es auf dem Barfußpfad sowie an den Grillstellen im Talwald. \
    Zusätzlich locken viele weitere Wanderwege, idyllische Picknickplätze und der nahe gelegene Donauquelle-Rundweg zu \
    Erkundungstouren durch die abwechslungsreiche Landschaft."
  );

  setupCard(
    "FitnessHallensport",
    "Furtwangen bietet im Winter tolle Möglichkeiten für Sport und Spaß im Schnee. Die Langlaufloipen an der \
    Martinskapelle sind bestens präpariert und ideal für Skilangläufer. Für Skifahrer steht der Skilift in Rohrbach bereit. Wer \
    es rasanter mag, kann beim Rodeln am Kandel die Hänge hinabsausen."
  );

  setupCard(
    "Wintersport",
    "Furtwangen bietet zahlreiche Möglichkeiten, aktiv und fit zu bleiben. \
    Beri Fitness überzeugt mit modernen Geräten und Kursen für alle Trainingsniveaus. \
    Im fit+ Furtwangen trainierst du flexibel und unabhängig von klassischen Öffnungszeiten. \
    In den Sommermonaten lädt das Freibad zum Schwimmen und Entspannen ein. \
    Direkt daneben bietet die Sporthalle Raum für vielfältige Sport- und Fitnessaktivitäten."
  );

  var headerAvatar = document.querySelector(".header-avatar");
  if (headerAvatar) {
    headerAvatar.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Hier finden Sie Infos zu Outdoor-Aktivitäten, Wintersport und Fitness."
        );
      }, 800);
    });
  }
});
