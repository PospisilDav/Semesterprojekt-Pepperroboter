document.addEventListener('DOMContentLoaded', function() {
    // set and update the clock every second
    setInterval(function() {
        const date = new Date()
        var hours = ((date.getHours() + 2) % 24).toString()
        hours = hours.length < 2 ? "0" + hours : hours
        var minutes = date.getMinutes().toString()
        minutes = minutes.length < 2 ? "0" + minutes : minutes
        document.getElementById("clockDisplay").innerText = hours + ":" + minutes
    }, 1000)
})