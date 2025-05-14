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

var isPlaying = undefined;

const PATH_PLAY_BUTTON = "../../assets/icons/play.svg";
const PATH_PAUSE_BUTTON = "../../assets/icons/pause.svg";

function updatePlayUI(button) {
  isPlaying = !isPlaying;
  if (button === 1){
    var playBtn1 = document.getElementById("playBtn1");
    if (!playBtn1) return;
      var playImg = playBtn1.querySelector("img");
    if (isPlaying) {
      playImg.src = PATH_PLAY_BUTTON;
    } else {
      playImg.src = PATH_PAUSE_BUTTON;
   }
} else if (button === 2){
      var playBtn2 = document.getElementById("playBtn2");
    if (!playBtn2) return;
      var playImg = playBtn2.querySelector("img");
    if (isPlaying) {
      playImg.src = PATH_PLAY_BUTTON;
    } else {
      playImg.src = PATH_PAUSE_BUTTON;
    }
  } else if (button === 3) {
      var playBtn3 = document.getElementById("playBtn3");
    if (!playBtn3) return;
   var playImg = playBtn3.querySelector("img");
    if (isPlaying) {
      playImg.src = PATH_PLAY_BUTTON;
   } else {
      playImg.src = PATH_PAUSE_BUTTON;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var playBtn1 = document.getElementById("playBtn1");
  var playBtn2 = document.getElementById("playBtn2");
  var playBtn3 = document.getElementById("playBtn3");



  if (playBtn1) {
    playBtn1.addEventListener("click", function () {
      updatePlayUI(1);
    });
  }
  if (playBtn2) {
    playBtn2.addEventListener("click", function () {
      updatePlayUI(2);
    });
  }
  if (playBtn3) {
    playBtn3.addEventListener("click", function () {
      updatePlayUI(3);
    });
  }
});

