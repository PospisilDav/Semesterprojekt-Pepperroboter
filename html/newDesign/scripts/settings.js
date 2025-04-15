var isMuted = false;

function toggleMute() {
    if (isMuted) {
        window.pepperController.setUnmute();
        document.getElementById("muteText").textContent = "Mute";
    } else {
        window.pepperController.setMute();
        document.getElementById("muteText").textContent = "Unmute";
    }

    isMuted = !isMuted;
}