"use strict";

var pepperController = window.pepperController;

function wegweiserFullyLoaded(e) {
  window.console.log("wegweiser initialized");

  pepperController.shutUpAndContinue();

  setTimeout(function () {
    pepperController.animatedSpeak(
      "Boy",
      "Hier finden Sie Adressen, Kontakte und Öffnungszeiten der Ämter in Furtwangen."
    );
  }, 800);
}

window.addEventListener("load", wegweiserFullyLoaded, false);

document.addEventListener("DOMContentLoaded", function () {
  // Get all office items and details cards
  var officeItems = document.querySelectorAll(".office-item");
  var officeCards = document.querySelectorAll(".office-card");
  const headerAvatar = document.querySelector(".header-avatar");

  if (headerAvatar) {
    headerAvatar.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Hier finden Sie Adressen, Kontakte und Öffnungszeiten der Ämter in Furtwangen."
        );
      }, 800);
    });
  }

  // Add click event listeners to office items
  for (var i = 0; i < officeItems.length; i++) {
    officeItems[i].addEventListener("click", function () {
      // Remove active class from all items
      for (var j = 0; j < officeItems.length; j++) {
        officeItems[j].classList.remove("active");
      }

      // Add active class to clicked item
      this.classList.add("active");

      // Get the office ID and show corresponding details
      var officeId = this.getAttribute("data-office");
      for (var k = 0; k < officeCards.length; k++) {
        officeCards[k].style.display = "none";
      }
      var detailsCard = document.getElementById(officeId + "-details");
      if (detailsCard) {
        detailsCard.style.display = "block";
      }
    });
  }

  // Initialize - make sure only the active office is shown
  for (var l = 0; l < officeCards.length; l++) {
    officeCards[l].style.display = "none";
  }
  var activeOffice = document.querySelector(".office-item.active");
  if (activeOffice) {
    var activeId = activeOffice.getAttribute("data-office");
    var activeDetailsCard = document.getElementById(activeId + "-details");
    if (activeDetailsCard) {
      activeDetailsCard.style.display = "block";
    }
  }
});
