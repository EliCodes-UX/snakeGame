const board = document.getElementById('gameBoard');
const instructionText = document.getElementById('instructionText');
const logo = document.getElementById('logo');

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// draw gameboard, snake, food
function draw() {
  board.innerHTML = '';
  drawSnake();
  drawFood();
}

function drawSnake() {
  snake.forEach(segment => {
    const snakeElement = createGameElement('div', 'snake');
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

function drawFood() {
  const foodElement = createGameElement('div', 'food');
  setPosition(foodElement, food);
  board.appendChild(foodElement);
}
function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'right':
      head.x++;
      break;
    case 'left':
      head.x--;
      break;
  }
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    increaseSpeed();
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      move();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

// setInterval(() => {
//   move();
//   draw();
// }, 200);

function startGame() {
  gameStarted = true;
  instructionText.style.display = 'none';
  logo.style.display = 'none';
  gameInterval = setInterval(() => {
    move();
    // checkCollision();
    draw();
  }, gameSpeedDelay);
}
function handleKeyPress(ev) {
  if (
    (!gameStarted && ev.code === 'Space') ||
    (!gameStarted && ev.key === ' ')
  ) {
    startGame();
  } else {
    switch (ev.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
    }
  }
}
document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
  console.log(gameSpeedDelay);
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
}
