"use strict";

var pepperController = window.pepperController;

function historieFullyLoaded(e) {
  window.console.log("historie initialized");

  pepperController.shutUpAndContinue();

  setTimeout(function () {
    pepperController.animatedSpeak(
      "Boy",
      "Was möchten Sie über die Historie von Furtwangen erfahren? Wählen Sie ein Thema."
    );
  }, 800);
}

window.addEventListener("load", furtwangenFullyLoaded, false);

document.addEventListener("DOMContentLoaded", function () {
  const headerAvatar = document.querySelector(".header-avatar");

  if (headerAvatar) {
    headerAvatar.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Was möchten Sie über die Historie von Furtwangen erfahren? Wählen Sie ein Thema."
        );
      }, 800);
    });
  }
});
