import { SNAKE_SPEED, update as updateSnake, draw as drawSnake, getSnakeHead, selfCollision as snakeSelfCollision } from './snake/index.js'
import { draw as drawFood, update as updateFood } from './food/index.js'
import { isOutsideBoard } from './board/index.js';

let lastTimeRender = 0;
const button = document.querySelector("button");
const body = document.querySelector("body");
var gameboard;

function main(currentTime) {
  console.log("esse é o gameboard: " + gameboard);
  if (checkGameOver()) {
    if(confirm('Você Perdeu o Jogo')) {
      window.location.reload();
    } else {
      window.requestAnimationFrame(main);
    }

    return;
  }

  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currentTime - lastTimeRender) / 1000;

  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastTimeRender = currentTime;

  update();

  draw();
}

function update() {
  updateSnake();
  updateFood();
  checkGameOver();
}

function draw() {
  gameboard.innerHTML = '';
  drawSnake(gameboard);
  drawFood(gameboard);
}

function checkGameOver() {
  return isOutsideBoard(getSnakeHead()) || snakeSelfCollision();
}

button.addEventListener('click', function () {
  console.log("cliquei");
  body.innerHTML = '<header><div class="score"><h1>SCORE: </h1><p id="score">10</p></div></header><main><div id="game-board"></div></main><footer>&copy2022 Anderson Monte</footer>';
  gameboard = document.getElementById('game-board');
  window.requestAnimationFrame(main);
});








