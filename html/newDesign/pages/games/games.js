"use strict";

var pepperController = window.pepperController;

function gamesFullyLoaded(e) {
  window.console.log("games initialized");

  pepperController.shutUpAndContinue();

  setTimeout(function () {
    pepperController.animatedSpeak(
      "Boy",
      "Lust auf ein Spiel? Wählen Sie eines aus, und spielen Sie direkt mit mir!"
    );
  }, 800);
}

window.addEventListener("load", gamesFullyLoaded, false);

document.addEventListener("DOMContentLoaded", function () {
  const headerAvatar = document.querySelector(".header-avatar");

  if (headerAvatar) {
    headerAvatar.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Lust auf ein Spiel? Wählen Sie eines aus, und spielen Sie direkt mit mir!"
        );
      }, 800);
    });
  }
});
