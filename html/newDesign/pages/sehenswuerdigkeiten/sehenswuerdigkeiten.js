"use strict";

var pepperController = window.pepperController;

function sehenswuerdigkeitenFullyLoaded(e) {
  window.console.log("sehenswuerdigkeiten initialized");

  pepperController.shutUpAndContinue();

  setTimeout(function () {
    pepperController.animatedSpeak(
      "Boy",
      "Hier erfahren Sie mehr über das Deutsche Uhrenmuseum und weitere Highlights."
    );
  }, 800);
}

window.addEventListener("load", sehenswuerdigkeitenFullyLoaded, false);

document.addEventListener("DOMContentLoaded", function () {
  const headerAvatar = document.querySelector(".header-avatar");

  if (headerAvatar) {
    headerAvatar.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Hier erfahren Sie mehr über das Deutsche Uhrenmuseum und weitere Highlights."
        );
      }, 800);
    });
  }
});
