const board = document.getElementById('gameBoard');

let snake = [{ x: 10, y: 10 }];
// draw gameboard, snake, food
function draw() {
  board.innerHTML = '';
  drawSnake();
}

function drawSnake() {
  snake.forEach(segment => {
    const snakeElement = createGameElement('div', 'snake');
    setPosition(snakeElement, segment);
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
