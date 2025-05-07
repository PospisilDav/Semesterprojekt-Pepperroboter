"use strict";

var pepperController = window.pepperController;

function citizenOfficeFullyLoaded(e) {
  window.console.log("citizenOffice initialized");

  pepperController.shutUpAndContinue();

  setTimeout(function () {
    pepperController.animatedSpeak(
      "Boy",
      "Willkommen bei der Stadtverwaltung! Bitte wählen Sie einen Service aus."
    );
  }, 800);
}

window.addEventListener("load", citizenOfficeFullyLoaded, false);

document.addEventListener("DOMContentLoaded", function () {
  const headerAvatar = document.querySelector(".header-avatar");

  if (headerAvatar) {
    headerAvatar.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Willkommen bei der Stadtverwaltung! Bitte wählen Sie einen Service aus."
        );
      }, 800);
    });
  }
});
