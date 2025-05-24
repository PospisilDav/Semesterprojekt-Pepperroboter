"use strict";

var pepperController = window.pepperController;

function servicesFullyLoaded(e) {
  window.console.log("citizen services initialized");

  pepperController.shutUpAndContinue();

  setTimeout(function () {
    pepperController.animatedSpeak(
      "Boy",
      "Hier finden Sie alle Leistungen und Services des Bürgeramts Furtwangen."
    );
  }, 800);
}

window.addEventListener("load", servicesFullyLoaded, false);

document.addEventListener("DOMContentLoaded", function () {
  // Get URL parameters
  var urlParams = function() {
    var params = {};
    var query = window.location.search.substring(1);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");
      params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }
    return params;
  }();
  
  var selectedService = urlParams["service"];

  // Hide all service details initially
  var allServiceCards = document.querySelectorAll(".office-card");
  for (var i = 0; i < allServiceCards.length; i++) {
    allServiceCards[i].style.display = "none";
  }

  // Remove active class from all service items
  var allServiceItems = document.querySelectorAll(".office-item");
  for (var j = 0; j < allServiceItems.length; j++) {
    allServiceItems[j].classList.remove("active");
  }

  // If service parameter exists, show the corresponding service details
  if (selectedService) {
    var detailsElement = document.getElementById(selectedService + "-details");
    
    var serviceItems = document.querySelectorAll(".office-item");
    var serviceItem = null;
    for (var k = 0; k < serviceItems.length; k++) {
      if (serviceItems[k].getAttribute("data-service") === selectedService) {
        serviceItem = serviceItems[k];
        break;
      }
    }
    
    if (detailsElement) {
      detailsElement.style.display = "block";
    } else {
      // Fallback to personalausweis if the specified service doesn't exist
      var defaultDetails = document.getElementById("personalausweis-details");
      if (defaultDetails) {
        defaultDetails.style.display = "block";
      }
      
      var defaultItems = document.querySelectorAll('.office-item');
      for (var l = 0; l < defaultItems.length; l++) {
        if (defaultItems[l].getAttribute("data-service") === "personalausweis") {
          defaultItems[l].classList.add("active");
          break;
        }
      }
    }
    
    if (serviceItem) {
      serviceItem.classList.add("active");
    }
  } else {
    // Show personalausweis by default if no parameter
    var personalausweisDetails = document.getElementById("personalausweis-details");
    if (personalausweisDetails) {
      personalausweisDetails.style.display = "block";
    }
    
    var personalausweisItems = document.querySelectorAll('.office-item');
    for (var m = 0; m < personalausweisItems.length; m++) {
      if (personalausweisItems[m].getAttribute("data-service") === "personalausweis") {
        personalausweisItems[m].classList.add("active");
        break;
      }
    }
  }

  // Add click event listeners to service items
  var clickableItems = document.querySelectorAll(".office-item");
  for (var n = 0; n < clickableItems.length; n++) {
    (function(item) {
      item.addEventListener("click", function () {
        // Remove active class from all items
        var innerItems = document.querySelectorAll(".office-item");
        for (var o = 0; o < innerItems.length; o++) {
          innerItems[o].classList.remove("active");
        }

        // Add active class to clicked item
        item.classList.add("active");

        // Hide all service details
        var allCards = document.querySelectorAll(".office-card");
        for (var p = 0; p < allCards.length; p++) {
          allCards[p].style.display = "none";
        }

        // Show corresponding service details
        var serviceId = item.getAttribute("data-service");
        var detailsEl = document.getElementById(serviceId + "-details");
        
        if (detailsEl) {
          detailsEl.style.display = "block";
        }
      });
    })(clickableItems[n]);
  }

  // Set up header avatar click to trigger Pepper speech
  var headerAvatar = document.querySelector(".header-avatar");

  if (headerAvatar) {
    headerAvatar.addEventListener("click", function () {
      setTimeout(function () {
        pepperController.animatedSpeak(
          "Boy",
          "Hier finden Sie alle Leistungen und Services des Bürgeramts Furtwangen."
        );
      }, 800);
    });
  }
});