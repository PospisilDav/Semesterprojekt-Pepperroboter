"use strict";

var currentPlayingButton = undefined;

const PATH_PLAY_BUTTON = "../../assets/icons/play.svg";
const PATH_PAUSE_BUTTON = "../../assets/icons/pause.svg";

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

window.addEventListener("load", historieFullyLoaded, false);

document.addEventListener("DOMContentLoaded", function () {
  const headerAvatar = document.querySelector(".header-avatar");
  const gruendungCard = document.getElementById("Gruendung");
  const zahlenfaktenCard = document.getElementById("ZahlenundFakten");
  const vergangenheitCard = document.getElementById("Vergangenheit");

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
  if (gruendungCard) {
    gruendungCard.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Stolz feierte die Stadt Furtwangen am 5. Mai 1998 die Verleihung der Stadtrechte vor 125 Jahren. Das für \
          das Stadtrecht erforderliche „Rathaus“ konnte 1867 durch den Erwerb und Umbau des ehemaligen Gasthauses Adler \
          vorgewiesen werden. Damit war der Weg vom “Marktflecken”, wie Furtwangen bis 1873 offiziell genannt wurde, zur \
          Stadterhebung frei, die Großherzog Friedrich I. im Mai 1873 feierlich vollzog."
        );
      }, 800);
    });
  }

  if (zahlenfaktenCard) {
    zahlenfaktenCard.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Furtwangen ist eine charmante Stadt im Schwarzwald-Baar-Kreis in Baden-Württemberg und gilt mit ihrer Höhenlage \
           von 850 bis 1.150 Metern über dem Meeresspiegel als die höchstgelegene Stadt des Bundeslandes."
        );
      }, 800);
    });
  }

  if (vergangenheitCard) {
    vergangenheitCard.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Seinen wirtschaftlichen Aufschwung verdankt Furtwangen der Uhr, die im 17. Jahrhundert den Schwarzwald \
          erreichte und der Region im 18. Jahrhundert einen ungeahnten Aufschwung brachte. Ausdruck und Motor dieser \
          Entwicklung war 1850 die Gründung der Uhrmacherschule. Ihr erster Rektor Robert Gerwig erlangte auch als Erbauer \
          der Schwarzwaldbahn Berühmtheit. Anstoß zur Einrichtung der Uhrmacherschule gab der Gewerbeverein, dem die Stadt \
          auch die Einrichtung der Sparkasse zu verdanken hat. Aus der Uhrmacherschule entwickelte sich die heutige \
          Hochschule Furtwangen University."
        );
      }, 800);
    });
  }
});

function updatePlayUI(buttonNumber) {
  const playBtn = document.getElementById(`playBtn${buttonNumber}`);
  if (!playBtn) return;

  const playImg = playBtn.querySelector("img");
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

document.addEventListener("DOMContentLoaded", function () {
  [1, 2, 3].forEach(function (num) {
    const btn = document.getElementById(`playBtn${num}`);
    if (btn) {
      btn.addEventListener("click", function () {
        updatePlayUI(num);
      });
    }
  });
});
