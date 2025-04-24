// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Speed dial functionality
    const speedDial = document.querySelector('.speed-dial');
    const speedDialButton = document.querySelector('.speed-dial-button');
    
    if (speedDialButton) {
        speedDialButton.addEventListener('click', function() {
            speedDial.classList.toggle('active');
        });
    }
    
    // Close speed dial when clicking elsewhere on the page
    document.addEventListener('click', function(event) {
        if (!speedDial.contains(event.target) && speedDial.classList.contains('active')) {
            speedDial.classList.remove('active');
        }
    });
});