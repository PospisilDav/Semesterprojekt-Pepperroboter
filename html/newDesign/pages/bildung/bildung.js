"use strict";

var pepperController = window.pepperController;

function bildungFullyLoaded(e) {
  window.console.log("bildung initialized");

  pepperController.shutUpAndContinue();

  setTimeout(function () {
    pepperController.animatedSpeak(
      "Boy",
      "Hier erfahren Sie alles über Studium, Campusleben und die Hochschule Furtwangen."
    );
  }, 800);
}

window.addEventListener("load", bildungFullyLoaded, false);

document.addEventListener("DOMContentLoaded", function () {
  const headerAvatar = document.querySelector(".header-avatar");
  const HFUCard = document.getElementById("hfu");
  const studiengaengeCard = document.getElementById("studiengaenge");
  const campusCard = document.getElementById("campus");

  if (headerAvatar) {
    headerAvatar.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Hier erfahren Sie alles über Studium, Campusleben und die Hochschule Furtwangen."
        );
      }, 800);
    });
  }

  if (HFUCard) {
    HFUCard.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak("Boy", "Bla Bla");
      }, 800);
    });
  }

  if (studiengaengeCard) {
    studiengaengeCard.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak("Boy", "Bla Bla");
      }, 800);
    });
  }

  if (campusCard) {
    campusCard.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak("Boy", "Bla Bla");
      }, 800);
    });
  }
});
