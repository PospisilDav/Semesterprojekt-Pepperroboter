var isMuted = false;

function toggleMute() {
    if (isMuted) {
        window.pepperController.setUnmute();
        window.pepperController.playSound(0);
        document.getElementById("muteText").textContent = "Stummschalten";
    } else {
        window.pepperController.setMute();
        window.pepperController.playSound(0);
        document.getElementById("muteText").textContent = "Entstummen";
    }

    isMuted = !isMuted;
}

function volPlus() {
    window.pepperController.volPlus();
    window.pepperController.playSound(0);
}

function volMinus() {
    window.pepperController.volMinus();
    window.pepperController.playSound(0);
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("muteBtn").addEventListener("click", function () {
        if (isMuted) {
            window.pepperController.setUnmute();
            window.pepperController.playSound(0);
            document.getElementById("muteText").textContent = "Stummschalten";
        } else {
            window.pepperController.setMute();
            window.pepperController.playSound(0);
            document.getElementById("muteText").textContent = "Entstummen";
        }

        isMuted = !isMuted;
    });
});
