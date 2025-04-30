document.addEventListener("DOMContentLoaded", function () {
  // Get all office items and details cards
  const officeItems = document.querySelectorAll(".office-item");
  const officeCards = document.querySelectorAll(".office-card");

  // Add click event listeners to office items
  officeItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      officeItems.forEach((office) => office.classList.remove("active"));

      // Add active class to clicked item
      this.classList.add("active");

      // Get the office ID
      const officeId = this.getAttribute("data-office");

      // Hide all detail cards
      officeCards.forEach((card) => (card.style.display = "none"));

      // Show the selected office details
      const selectedCard = document.getElementById(`${officeId}-details`);
      selectedCard.style.display = "block";

      // Add visual feedback for selection
      selectedCard.classList.add("card-appear");
      setTimeout(() => {
        selectedCard.classList.remove("card-appear");
      }, 300);

      // Announce selection for accessibility
      const announcer =
        document.getElementById("accessibility-announcer") || createAnnouncer();
      announcer.textContent = `${
        this.querySelector(".office-name").textContent
      } ausgewählt`;
    });
  });

  // Create accessibility announcer if needed
  function createAnnouncer() {
    const announcer = document.createElement("div");
    announcer.id = "accessibility-announcer";
    announcer.setAttribute("aria-live", "polite");
    announcer.className = "sr-only";
    document.body.appendChild(announcer);
    return announcer;
  }

  // Initialize - make sure only the active office is shown
  officeCards.forEach((card) => {
    card.style.display = "none";
  });
  const activeOffice = document.querySelector(".office-item.active");
  if (activeOffice) {
    const activeId = activeOffice.getAttribute("data-office");
    document.getElementById(`${activeId}-details`).style.display = "block";
  }
});
