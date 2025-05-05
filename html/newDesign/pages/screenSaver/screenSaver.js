document.addEventListener('DOMContentLoaded', function() {
    setInterval(function() {
        const date = new Date()
        var hours = ((date.getHours() + 2) % 24).toString()
        hours = hours < 2 ? "0" + hours : hours
        document.getElementById("clockDisplay").innerText = hours + ":" + date.getMinutes()
    }, 1000)
})