"use strict";

var currentPlayingButton = null;

var PATH_PLAY_BUTTON = "../../assets/icons/play.svg";
var PATH_PAUSE_BUTTON = "../../assets/icons/pause.svg";

var pepperController = window.pepperController;

function updatePlayUI(cardElement) {
  var playImg = cardElement.getElementsByClassName("play-icon")[0];
  if (!playImg) return;

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
  }
}

function setupCard(cardId, speakText) {
  var card = document.getElementById(cardId);
  if (!card) return;

  card.addEventListener("click", function (e) {
    e.stopPropagation();
    updatePlayUI(card);

    setTimeout(function () {
      pepperController.animatedSpeak("Boy", speakText);
    }, 800);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupCard(
    "founding",
    "Stolz feierte die Stadt Furtwangen am 5. Mai 1998 die Verleihung der Stadtrechte vor 125 Jahren. Das für \
          das Stadtrecht erforderliche „Rathaus“ konnte 1867 durch den Erwerb und Umbau des ehemaligen Gasthauses Adler \
          vorgewiesen werden. Damit war der Weg vom “Marktflecken”, wie Furtwangen bis 1873 offiziell genannt wurde, zur \
          Stadterhebung frei, die Großherzog Friedrich I. im Mai 1873 feierlich vollzog."
  );

  setupCard(
    "factsAndFigures",
    "Furtwangen ist eine charmante Stadt im Schwarzwald-Baar-Kreis in Baden-Württemberg und gilt mit ihrer Höhenlage \
           von 850 bis 1.150 Metern über dem Meeresspiegel als die höchstgelegene Stadt des Bundeslandes."
  );

  setupCard(
    "past",
    "Seinen wirtschaftlichen Aufschwung verdankt Furtwangen der Uhr, die im 17. Jahrhundert den Schwarzwald \
          erreichte und der Region im 18. Jahrhundert einen ungeahnten Aufschwung brachte. Ausdruck und Motor dieser \
          Entwicklung war 1850 die Gründung der Uhrmacherschule. Ihr erster Rektor Robert Gerwig erlangte auch als Erbauer \
          der Schwarzwaldbahn Berühmtheit. Anstoß zur Einrichtung der Uhrmacherschule gab der Gewerbeverein, dem die Stadt \
          auch die Einrichtung der Sparkasse zu verdanken hat. Aus der Uhrmacherschule entwickelte sich die heutige \
          Hochschule Furtwangen University."
  );

  var headerAvatar = document.querySelector(".header-avatar");
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
