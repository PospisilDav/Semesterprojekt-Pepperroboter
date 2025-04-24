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
    
    // Language button functionality
    const languageButton = document.getElementById('language-button');
    if (languageButton) {
        languageButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Toggle between languages (implement as needed)
            alert('Sprache wechseln');
        });
    }
    
    // Help button functionality
    const helpButton = document.getElementById('help-button');
    if (helpButton) {
        helpButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Show help dialog (implement as needed)
            alert('Hilfe angezeigt');
        });
    }
});