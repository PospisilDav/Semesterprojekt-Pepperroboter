document.addEventListener("DOMContentLoaded", function () {
  // Get all location items and details cards
  const locationItems = document.querySelectorAll(".location-item");
  const locationCards = document.querySelectorAll(".location-card");

  // Add click event listeners to location items
  locationItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      locationItems.forEach((location) => location.classList.remove("active"));

      // Add active class to clicked item
      this.classList.add("active");

      // Get the location ID and show corresponding details
      const locationId = this.getAttribute("data-location");
      locationCards.forEach((card) => (card.style.display = "none"));
      document.getElementById(`${locationId}-details`).style.display = "block";
    });
  });

  // Initialize - show only the active location
  locationCards.forEach((card) => (card.style.display = "none"));
  const activeLocation = document.querySelector(".location-item.active");
  if (activeLocation) {
    const activeId = activeLocation.getAttribute("data-location");
    document.getElementById(`${activeId}-details`).style.display = "block";
  }
});