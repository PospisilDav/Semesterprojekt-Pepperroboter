document.addEventListener('DOMContentLoaded', function() {
    setInterval(function() {
        const date = new Date()
        document.getElementById("clockDisplay").innerText = date.getHours() + ":" + date.getMinutes()
    }, 1000)
})