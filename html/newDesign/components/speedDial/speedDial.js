document.addEventListener("DOMContentLoaded", function() {
    const speedDial = document.querySelector('.speed-dial');
    const speedDialButton = document.querySelector('.speed-dial-button');
    
    if (speedDialButton) {
        speedDialButton.addEventListener('click', function() {
            speedDial.classList.toggle('active');
        });
    }
});