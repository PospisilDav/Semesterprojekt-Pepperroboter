function randomElementFromArray(arr) {
    var element = arr[Math.floor(Math.random() * arr.length)];
    return element;
}

var foodItemsArray = [
    '🐁',
    '🍇',
    '🍉',
    '🍈',
    '🍓',
    '🍍',
    '🍌',
    '🥝',
    '🍏',
    '🍎',
    '🍔',
    '🍅',
    '🥚',
];

// game display elements
var grid = document.querySelector('.grid');
var scoreDisplay = document.querySelector('span');
var startBtn = document.querySelector('.start-btn');
var keyBtns = document.querySelectorAll('.keys-container button');

// game variables
var width = 10;
var numCells = width * width;
var currentSnake = [2, 1, 0];
var snakeColor = Math.floor(Math.random() * 360);
var snakeColorIncrement = 10;
var direction = 1;
var intervalTime = 500; // determines speed - frequency of game loop calls
var interval = 0;
var foodItemIndex = 0; // first cell
var score = 0;

grid.style.width = (width * 10 * 2) + "px";
grid.style.height = (width * 10 * 2) + "px";

// create grid cells
for (var i = 0; i < width * width; i++) {
    var cell = document.createElement('div');
    cell.style.width = (width * 2) + "px";
    cell.style.height = (width * 2) + "px";
    grid.appendChild(cell);
}
var cells = document.querySelectorAll('.grid div');

function createFood() {
    foodItemIndex = Math.floor(Math.random() * numCells);
    
    if (currentSnake.indexOf(foodItemIndex) !== -1) {
        // If food is on snake, try again after a short delay
        setTimeout(function() {
            createFood();
        }, 100);
    } else {
        cells[foodItemIndex].classList.add('food-item');
        cells[foodItemIndex].innerText = randomElementFromArray(foodItemsArray);
    }
}

function startGame() {
    grid.classList.remove('shake');
    
    // Clear snake from grid
    for (var i = 0; i < currentSnake.length; i++) {
        var snakeIndex = currentSnake[i];
        cells[snakeIndex].style.background = 'none';
        cells[snakeIndex].classList.remove('snake');
        cells[snakeIndex].innerText = '';
    }
    
    clearInterval(interval);
    direction = 1;
    currentSnake = [2, 1, 0];
    
    // Draw snake on grid
    for (var j = 0; j < currentSnake.length; j++) {
        var index = currentSnake[j];
        snakeColor = (snakeColor + snakeColorIncrement) % 360;
        cells[index].style.background = "hsl(" + snakeColor + ", 100%, 50%)";
        cells[index].classList.add('snake');
    }
    
    // Clear any existing food
    cells[foodItemIndex].classList.remove('food-item');
    cells[foodItemIndex].innerText = '';
    
    createFood();
    score = 0;
    scoreDisplay.innerHTML = score;
    interval = setInterval(gameLoop, intervalTime);
}

function gameLoop() {
    cells[currentSnake[0]].innerText = '';
    
    // Check for collisions
    if (
        (currentSnake[0] + width >= width * width && direction === width) || // hits bottom wall
        (currentSnake[0] % width === width - 1 && direction === 1) || // hits right wall
        (currentSnake[0] % width === 0 && direction === -1) || // hits left wall
        (currentSnake[0] - width < 0 && direction === -width) || // hits the top wall
        cells[currentSnake[0] + direction].classList.contains('snake') // hits itself
    ) {
        grid.classList.add('shake');
        clearInterval(interval);
        return;
    }
    
    var tail = currentSnake.pop();
    cells[tail].classList.remove('snake');
    cells[tail].style.background = 'none';
    
    currentSnake.unshift(currentSnake[0] + direction); // gives direction to the head

    // Check if snake ate food
    if (cells[currentSnake[0]].classList.contains('food-item')) {
        cells[currentSnake[0]].classList.remove('food-item');
        cells[tail].classList.add('snake');
        snakeColor = (snakeColor + snakeColorIncrement) % 360;
        cells[tail].style.background = "hsl(" + snakeColor + ", 100%, 50%)";
        currentSnake.push(tail);
        score++;
        scoreDisplay.textContent = score;
        createFood();
    }
    
    cells[currentSnake[0]].classList.add('snake');
    cells[currentSnake[0]].innerText = '👀';
    snakeColor = (snakeColor + snakeColorIncrement) % 360;
    intervalTime = Math.max(100, 500 - score * 10);
    cells[currentSnake[0]].style.background = "hsl(" + snakeColor + ", 100%, 50%)";
}

function moveSnake(moveDirection) {
    var directionVal;
    
    if (moveDirection === 'ArrowRight' && direction !== -1) {
        directionVal = 1;
        if (currentSnake[0] + directionVal === currentSnake[1]) return;
        direction = directionVal;
    }
    if (moveDirection === 'ArrowLeft' && direction !== 1) {
        directionVal = -1;
        if (currentSnake[0] + directionVal === currentSnake[1]) return;
        direction = directionVal;
    }
    if (moveDirection === 'ArrowUp' && direction !== width) {
        directionVal = -width;
        if (currentSnake[0] + directionVal === currentSnake[1]) return;
        direction = directionVal;
    }
    if (moveDirection === 'ArrowDown' && direction !== -width) {
        directionVal = width;
        if (currentSnake[0] + directionVal === currentSnake[1]) return;
        direction = directionVal;
    }
}

function handleKeyMove(e) {
    var key = e.key || e.keyCode;
    
    if (key === 'ArrowRight' || key === 'Right' || key === 39) {
        moveSnake('ArrowRight');
    } else if (key === 'ArrowLeft' || key === 'Left' || key === 37) {
        moveSnake('ArrowLeft');
    } else if (key === 'ArrowUp' || key === 'Up' || key === 38) {
        moveSnake('ArrowUp');
    } else if (key === 'ArrowDown' || key === 'Down' || key === 40) {
        moveSnake('ArrowDown');
    }
}

function handleButtonKeyMove(e) {
    var id = this.id || e.currentTarget.id;
    moveSnake(id);
}

for (var k = 0; k < keyBtns.length; k++) {
    var btn = keyBtns[k];
    if (btn.addEventListener) {
        btn.addEventListener('mousedown', handleButtonKeyMove);
        btn.addEventListener('touchstart', handleButtonKeyMove);
    } else if (btn.attachEvent) {
        btn.attachEvent('onmousedown', handleButtonKeyMove);
        btn.attachEvent('ontouchstart', handleButtonKeyMove);
    }
}

if (document.addEventListener) {
    document.addEventListener('keydown', handleKeyMove);
    startBtn.addEventListener('click', startGame);
} else if (document.attachEvent) {
    document.attachEvent('onkeydown', handleKeyMove);
    startBtn.attachEvent('onclick', startGame);
}

document.addEventListener('DOMContentLoaded', function() {
    createFood();
}, false);

