document.addEventListener('DOMContentLoaded', function() {
    setInterval(function() {
        const date = new Date()
        const hours = date.getHours().length < 2 ? "0" + date.getHours() : date.getHours()
        document.getElementById("clockDisplay").innerText = hours + ":" + date.getMinutes()
    }, 1000)
})