"use strict";

var pepperController = window.pepperController;

function sportFullyLoaded(e) {
  window.console.log("sport initialized");

  pepperController.shutUpAndContinue();

  setTimeout(function () {
    pepperController.animatedSpeak(
      "Boy",
      "Hier finden Sie Infos zu Outdoor-Aktivitäten, Wintersport und Fitness."
    );
  }, 800);
}

window.addEventListener("load", sportFullyLoaded, false);

document.addEventListener("DOMContentLoaded", function () {
  const headerAvatar = document.querySelector(".header-avatar");
  const outdoorNaturCard = document.getElementById("OutdoorNatur");
  const wintersportCard = document.getElementById("Wintersport");
  const fitnessHallensportCard = document.getElementById("FitnessHallensport");

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

  if (outdoorNaturCard) {
    outdoorNaturCard.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Furtwangen ist ideal für alle, die draußen aktiv sein möchten. Eine Wanderung zum Brend-Turm bietet \
          fantastische Ausblicke über den Schwarzwald. Für Abenteuer auf zwei Rädern laden die Mountainbike-Strecken am \
          Linach-Damm ein. Entspannung und Naturerlebnis gibt es auf dem Barfußpfad sowie an den Grillstellen im Talwald. \
          Zusätzlich locken viele weitere Wanderwege, idyllische Picknickplätze und der nahe gelegene Donauquelle-Rundweg zu \
          Erkundungstouren durch die abwechslungsreiche Landschaft."
        );
      }, 800);
    });
  }

  if (wintersportCard) {
    wintersportCard.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Furtwangen bietet im Winter tolle Möglichkeiten für Sport und Spaß im Schnee. Die Langlaufloipen an der \
          Martinskapelle sind bestens präpariert und ideal für Skilangläufer. Für Skifahrer steht der Skilift in Rohrbach bereit. Wer \
          es rasanter mag, kann beim Rodeln am Kandel die Hänge hinabsausen."
        );
      }, 800);
    });
  }

  if (fitnessHallensportCard) {
    fitnessHallensportCard.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Furtwangen bietet zahlreiche Möglichkeiten, aktiv und fit zu bleiben. \
          Beri Fitness überzeugt mit modernen Geräten und Kursen für alle Trainingsniveaus. \
          Im fit+ Furtwangen trainierst du flexibel und unabhängig von klassischen Öffnungszeiten. \
          In den Sommermonaten lädt das Freibad zum Schwimmen und Entspannen ein. \
          Direkt daneben bietet die Sporthalle Raum für vielfältige Sport- und Fitnessaktivitäten."
        );
      }, 800);
    });
  }
});
