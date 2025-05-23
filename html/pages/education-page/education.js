"use strict";

var currentPlayingButton = null;

var PATH_PLAY_BUTTON = "../../assets/icons/play.svg";
var PATH_PAUSE_BUTTON = "../../assets/icons/pause.svg";

var pepperController = window.pepperController;

/**
 * dynamically render the info cards and add event listeners
 */
function setupCard(cardId, speakText) {
  var card = document.getElementById(cardId);
  var playImg = card.getElementsByClassName("play-icon")[0];
  if (!playImg) return;
  if (!card) return;

  card.addEventListener("click", function (e) {
    e.stopPropagation();

    // toggle play/pause button image
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
      setTimeout(function () {
        pepperController.animatedSpeak("Boy", speakText);
      }, 800);  
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupCard(
    "hfu",
    "Willkommen an der Hochschule Furtwangen – einer der renommiertesten Hochschulen für angewandte Wissenschaften in Deutschland! \
    Die HFU blickt auf eine lange Tradition zurück: Sie wurde 1850 als erste deutsche Uhrmacherschule gegründet. \
    Heute ist sie ein moderner Hochschulverbund mit drei Standorten: Furtwangen, Villingen-Schwenningen und Tuttlingen."
  );

  setupCard(
    "studiengaenge",
    "Die HFU bietet ein breites und zukunftsorientiertes Studienangebot. Die Schwerpunkte liegen auf Technik, Informatik, \ Wirtschaft, Gesundheit und Medien. \
    Alle Studiengänge sind praxisorientiert, zukunftssicher und mit besten Berufsperspektiven ausgestattet, oft in enger Kooperation mit der Industrie!"
  );

  setupCard(
    "campus",
    "Der Campus Furtwangen bietet Studierenden ein familiäres Umfeld mitten im Schwarzwald, perfekt zum Studieren und Wohlfühlen! \
    Cafeteria, Mensa und Lernlounges laden zum Verweilen ein. Wer Ruhe oder Austausch sucht, wird hier beides finden. Studieren, wo andere Urlaub machen!"
  );

  var headerAvatar = document.querySelector(".header-avatar");
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
});
