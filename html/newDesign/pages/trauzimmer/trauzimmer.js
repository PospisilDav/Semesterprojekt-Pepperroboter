document.addEventListener("DOMContentLoaded", function () {
  // Get all location items and details cards
  var locationItems = document.querySelectorAll(".location-item");
  var locationCards = document.querySelectorAll(".location-card");

  // Add click event listeners to location items
  for (var i = 0; i < locationItems.length; i++) {
    locationItems[i].addEventListener("click", function () {
      // Remove active class from all items
      for (var j = 0; j < locationItems.length; j++) {
        locationItems[j].classList.remove("active");
      }

      // Add active class to clicked item
      this.classList.add("active");

      // Get the location ID and show corresponding details
      var locationId = this.getAttribute("data-location");
      for (var k = 0; k < locationCards.length; k++) {
        locationCards[k].style.display = "none";
      }
      var detailsCard = document.getElementById(locationId + "-details");
      if (detailsCard) {
        detailsCard.style.display = "block";
      }
    });
  }

  // Initialize - show only the active location
  for (var l = 0; l < locationCards.length; l++) {
    locationCards[l].style.display = "none";
  }
  var activeLocation = document.querySelector(".location-item.active");
  if (activeLocation) {
    var activeId = activeLocation.getAttribute("data-location");
    var activeDetailsCard = document.getElementById(activeId + "-details");
    if (activeDetailsCard) {
      activeDetailsCard.style.display = "block";
    }
  }
});