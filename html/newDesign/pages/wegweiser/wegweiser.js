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

      // Get the office ID and show corresponding details
      const officeId = this.getAttribute("data-office");
      officeCards.forEach((card) => (card.style.display = "none"));
      document.getElementById(`${officeId}-details`).style.display = "block";
    });
  });

  // Initialize - make sure only the active office is shown
  officeCards.forEach((card) => (card.style.display = "none"));
  const activeOffice = document.querySelector(".office-item.active");
  if (activeOffice) {
    const activeId = activeOffice.getAttribute("data-office");
    document.getElementById(`${activeId}-details`).style.display = "block";
  }
});