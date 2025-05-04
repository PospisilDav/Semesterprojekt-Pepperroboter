"use strict";

var pepperController = window.pepperController;

function restaurantsFullyLoaded(e) {
  window.console.log("restaurants initialized");

  pepperController.shutUpAndContinue();

  setTimeout(function () {
    pepperController.animatedSpeak(
      "Boy",
      "Hier finden Sie Restaurants mit regionaler und internationaler Küche sowie gemütliche Cafés."
    );
  }, 800);
}

window.addEventListener("load", restaurantsFullyLoaded, false);

document.addEventListener("DOMContentLoaded", function () {
  const headerAvatar = document.querySelector(".header-avatar");
  const regionalCard = document.getElementById("regional");
  const internationalCard = document.getElementById("international");
  const cafeCard = document.getElementById("Cafe");

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

  if (regionalCard) {
    regionalCard.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Furtwangen lädt Genießer ein, die Vielfalt der Schwarzwälder Küche zu entdecken. Im Höhengasthaus \
          Kolmenhof werden traditionelle Spezialitäten wie Vesperplatten, Wildgerichte und Schwarzwälder Kirschtorte in ruhiger \
          Atmosphäre serviert – perfekt nach einer Wanderung zur Donauquelle. Das Gasthaus Bad verwöhnt seine Gäste mit \
          feiner, regionaler Küche und saisonalen Angeboten wie Spargel- oder Wildwochen. Ebenfalls sehr beliebt ist das \
          Gasthaus Staude, das für seine deftigen Schwarzwälder Klassiker und gemütliche Gastlichkeit bekannt ist."
        );
      }, 800);
    });
  }

  if (internationalCard) {
    internationalCard.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Auch internationale Spezialitäten kommen in Furtwangen nicht zu kurz. Im Ristorante Pizzeria Europa \
          genießen Gäste italienische Klassiker wie Pizza und Pasta. Der City Kebap und der Kebap Treff bieten frische türkische \
          Gerichte wie Döner, Dürüm und Falafel – perfekt für eine schnelle und leckere Mahlzeit."
        );
      }, 800);
    });
  }

  if (cafeCard) {
    cafeCard.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Für Kaffeeliebhaber und Naschkatzen bietet Furtwangen gemütliche Adressen. In der Confiserie Mayerhöfer \
          warten feinste Pralinen, Torten und Kaffeespezialitäten. Das Eiscafé Edelweiss lockt mit hausgemachtem Eis und \
          italienischem Flair. Ein besonderes Ausflugsziel ist die historische Hexenlochmühle, wo man bei Kaffee und \
          Schwarzwälder Kirschtorte in traditioneller Atmosphäre entspannen kann."
        );
      }, 800);
    });
  }
});
