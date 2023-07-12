"use strict";
const REFRESH_RATE = 1000 / 25; // denominator: fps
const FACTOR_BOUNCE_BACK = -0.8;
const FACTOR_FRICTION = 0.6;
const FACTOR_SPEED = 0.4;
const GRAVITY = 9.8;

let x, y, z;
let vx = 0.0;
let vy = 0.0;
let ax = 0;
let ay = 0;
let ballX = 0;
let ballY = 0;
let ballRadius = 0;
let canvasSide = 0;
let context = null;
let ballColor = "#001C55";

const itemSize = 10;
let score = 0;

let itemX = 0;
let itemY = 0;
let previousScore = 0;
let gameTimer = 0; // Game timer in seconds
let gameTimerInterval = null; // Interval for updating the game timer

function init() {
  addEventListener("devicemotion", getValues, true);
  initCanvas();
  setInterval(useValues, REFRESH_RATE);
  startGameTimer(); // Start the game timer
}

function initCanvas() {
  let canvas = document.getElementById("canvas1");
  context = canvas.getContext("2d");
  canvasSide = context.canvas.width;
  context.canvas.height = canvasSide;
  ballRadius = Math.floor(canvasSide / 10);
  ballX = Math.floor(canvasSide / 2);
  ballY = ballX;
  itemX = Math.random() * (canvasSide - itemSize);
  itemY = Math.random() * (canvasSide - itemSize);
  score = 0;
  gameTimer = 60;
  vx = 0.0;
  vy = 0.0;
  ax = 0;
  ay = 0;
}

function getValues(event) {
  x = event.accelerationIncludingGravity.x;
  y = event.accelerationIncludingGravity.y;
  z = event.accelerationIncludingGravity.z;
}

function useValues() {
  if (
    typeof x == "undefined" ||
    typeof y == "undefined" ||
    typeof z == "undefined"
  ) {
    return;
  } // 가속도 값이 정의되지 않은 경우 함수 종료

  let f = 1 - (FACTOR_FRICTION * Math.abs(z)) / GRAVITY; // 마찰 계수 적용
  ax = x * f; // x축 가속도 계산
  ay = y * f; // y축 가속도 계산
  vx += ax * FACTOR_SPEED; // x축 속도 업데이트
  vy += ay * FACTOR_SPEED; // y축 속도 업데이트
  ballX -= vx * FACTOR_SPEED; // 공의 x좌표 업데이트
  ballY += vy * FACTOR_SPEED; // 공의 y좌표 업데이트

  let min = ballRadius; // 최소 벽 충돌 거리
  let max = canvasSide - ballRadius; // 최대 벽 충돌 거리
  if (ballX < min) {
    ballX = min;
    vx *= FACTOR_BOUNCE_BACK;
    ballRadius += 1;
    ballColor = "#001C55";
    // Decrement the score
    score--;
  } // 왼쪽 벽 충돌
  if (ballY < min) {
    ballY = min;
    vy *= FACTOR_BOUNCE_BACK;
    ballRadius -= 2;
    ballColor = "#A6E1FA";
    // Decrement the score
    score--;
  } // 위쪽 벽 충돌
  if (ballX > max) {
    ballX = max;
    vx *= FACTOR_BOUNCE_BACK;
    ballRadius += 1;
    ballColor = "#001C55";
    // Decrement the score
    score--;
  } // 오른쪽 벽 충돌
  if (ballY > max) {
    ballY = max;
    vy *= FACTOR_BOUNCE_BACK;
    ballRadius -= 2;
    ballColor = "#A6E1FA";
    // Decrement the score
    score--;
  } // 아래쪽 벽 충돌

  // Check if the ball touches the item
  if (
    ballX + ballRadius >= itemX + itemSize / 2 &&
    ballX - ballRadius <= itemX + itemSize / 2 &&
    ballY + ballRadius >= itemY + itemSize / 2 &&
    ballY - ballRadius <= itemY + itemSize / 2
  ) {
    // Increment the score
    score += 5;

    // Generate a new item in a random position
    itemX = Math.random() * (canvasSide - itemSize);
    itemY = Math.random() * (canvasSide - itemSize);
  }

  // Game over when the ball is bigger than the canvas or disappear
  if (ballRadius >= canvasSide / 2 || ballRadius <= 0) {
    gameOver();
    return;
  }

  drawBall(ballX, ballY, ballRadius, ballColor);
  drawItem();
  drawScore();
  drawTimer();
}

function drawBall(bx, by, r, color) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.beginPath();
  context.moveTo(bx, by);
  context.arc(bx, by, r, 0.0, Math.PI * 2, false);
  context.fillStyle = color;
  context.fill();
  context.closePath();
}

let itemVisible = true; // Flag to track the item's visibility
let itemDisappearTimeout = null; // Timeout for item disappearance

function drawItem() {
  let itemIcon = "🍓";
  context.fillText(itemIcon, itemX, itemY);

  if (!itemDisappearTimeout) {
    // Start the timeout for item disappearance
    itemDisappearTimeout = setTimeout(disappearItem, 5000);
  }
}

function disappearItem() {
  itemVisible = !itemVisible; // Toggle the item's visibility flag
  drawItem(); // Redraw the item to clear or display it

  if (itemVisible) {
    // If the item is still visible, set a timeout for blinking
    setTimeout(disappearItem, 5000);
  } else {
    // If the item is no longer visible, reset the timeout and generate a new item
    clearTimeout(itemDisappearTimeout);
    itemDisappearTimeout = null;
    generateNewItem();
  }
}

function generateNewItem() {
  // Generate a new item in a random position
  itemX = Math.random() * (canvasSide - itemSize);
  itemY = Math.random() * (canvasSide - itemSize);
  itemVisible = true; // Set the item as visible

  setTimeout(drawItem(), 5000); // Draw the newly generated item
}

function drawScore() {
  context.font = "16px Arial";
  context.fillStyle = "#000";
  context.fillText("Score: " + score, 10, 20);
}

function drawTimer() {
  context.font = "16px Arial";
  context.fillStyle = "#000";
  context.fillText("Time: " + gameTimer + "s", 10, 40);
}

function startGameTimer() {
  gameTimerInterval = setInterval(updateGameTimer, 1000);
}

function updateGameTimer() {
  gameTimer--;
  if (gameTimer <= 0) {
    clearInterval(gameTimerInterval);
    gameOver();
  }
}

function gameOver() {
  clearInterval(gameTimerInterval);
  alert("Game Over");
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  refreshGame();
}

function refreshGame() {
  gameTimer = 60;
  initCanvas();
  clearInterval(gameTimerInterval);
  startGameTimer();
}
