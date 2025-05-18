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
  // Get URL parameters - older browser compatible way
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
  
  var selectedAmt = urlParams["amt"];

  // Hide all office details initially
  var allOfficeCards = document.querySelectorAll(".office-card");
  for (var i = 0; i < allOfficeCards.length; i++) {
    allOfficeCards[i].style.display = "none";
  }

  // Remove active class from all office items
  var allOfficeItems = document.querySelectorAll(".office-item");
  for (var j = 0; j < allOfficeItems.length; j++) {
    allOfficeItems[j].classList.remove("active");
  }

  // If amt parameter exists, show the corresponding office details
  if (selectedAmt) {
    var detailsElement = document.getElementById(selectedAmt + "-details");
    
    // Using querySelector with attribute selector for older browsers
    var officeItems = document.querySelectorAll(".office-item");
    var officeItem = null;
    for (var k = 0; k < officeItems.length; k++) {
      if (officeItems[k].getAttribute("data-office") === selectedAmt) {
        officeItem = officeItems[k];
        break;
      }
    }
    
    if (detailsElement) {
      detailsElement.style.display = "block";
    } else {
      // Fallback to bürgerservice if the specified amt doesn't exist
      var defaultDetails = document.getElementById("buergerservice-details");
      if (defaultDetails) {
        defaultDetails.style.display = "block";
      }
      
      var defaultItems = document.querySelectorAll('.office-item');
      for (var l = 0; l < defaultItems.length; l++) {
        if (defaultItems[l].getAttribute("data-office") === "buergerservice") {
          defaultItems[l].classList.add("active");
          break;
        }
      }
    }
    
    if (officeItem) {
      officeItem.classList.add("active");
    }
  } else {
    // Show bürgerservice by default if no parameter
    var buergerserviceDetails = document.getElementById("buergerservice-details");
    if (buergerserviceDetails) {
      buergerserviceDetails.style.display = "block";
    }
    
    var buergerserviceItems = document.querySelectorAll('.office-item');
    for (var m = 0; m < buergerserviceItems.length; m++) {
      if (buergerserviceItems[m].getAttribute("data-office") === "buergerservice") {
        buergerserviceItems[m].classList.add("active");
        break;
      }
    }
  }

  // Add click event listeners to office items
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

        // Hide all office details
        var allCards = document.querySelectorAll(".office-card");
        for (var p = 0; p < allCards.length; p++) {
          allCards[p].style.display = "none";
        }

        // Show corresponding office details
        var officeId = item.getAttribute("data-office");
        var detailsEl = document.getElementById(officeId + "-details");
        
        if (detailsEl) {
          detailsEl.style.display = "block";
        }
      });
    })(clickableItems[n]);
  }

  var headerAvatar = document.querySelector(".header-avatar");

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

  // Add a CSS rule for the highlight animation - older browser compatible
  var style = document.createElement("style");
  style.type = "text/css";
  var cssText = [
    "@keyframes highlight-pulse {",
    "  0% { box-shadow: 0 0 0 0 rgba(82, 173, 89, 0.7); }",
    "  50% { box-shadow: 0 0 0 10px rgba(82, 173, 89, 0); }",
    "  100% { box-shadow: 0 0 0 0 rgba(82, 173, 89, 0); }",
    "}",
    "",
    ".highlight-selection {",
    "  animation: highlight-pulse 1.5s ease-out;",
    "  background-color: rgba(82, 173, 89, 0.2);",
    "  transition: background-color 1.5s ease;",
    "}"
  ].join("\n");

  // For older browsers
  try {
    style.appendChild(document.createTextNode(cssText));
  } catch (e) {
    // IE8 and below method
    style.styleSheet.cssText = cssText;
  }

  document.head.appendChild(style);
});