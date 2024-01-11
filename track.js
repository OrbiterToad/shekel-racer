let x = 100;
let y = 100;

let speed = 0;
let score;

let rotation = 0;
let currentDirection = '';

let coinX, coinY, coinSize;

let img;

let boost;

const MAX_SPEED = 8;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);
  img = loadImage('police-car-siren-blue.png');
  spawnCoin();
  score = 0;
  boost = false;
}

function draw() {
  clear();
  drawCoin();
  translate(x, y);
  handleInput();
  checkBoundaries();
  updateRotation();
  updateScore();
  updateCarPosition();
}

function spawnCoin() {
  coinX = random(0, window.innerWidth);
  coinY = random(0, window.innerHeight);
  coinSize = random(20, 50);
}

function drawCoin() {
  fill(255, 255, 0);
  ellipse(coinX, coinY, coinSize);
}

function handleInput() {
  if (keyIsDown(LEFT_ARROW)) {
    rotateCar(-85);
  } else if (keyIsDown(RIGHT_ARROW)) {
    rotateCar(85);
  }

  if (keyIsDown(UP_ARROW)) {
    speedUp('forward', MAX_SPEED);
  } else if (keyIsDown(DOWN_ARROW)) {
    speedUp('backwards', 4);
  } else {
    slowDown(97);
  }

  boost = keyIsDown(SHIFT);
}

function rotateCar(angle) {
  rotation += (speed / 100) * angle;
  speed *= 0.93;
}

function speedUp(direction, maxSpeed) {
  startCar(direction);
  if (currentDirection === direction && speed <= maxSpeed) {
    speed = boost ? speed * 1.3 : speed * 1.1;
    drive();
  } else {
    slowDown(80);
  }
}

function slowDown(brakes) {
  if (speed >= 0.01) {
    speed *= brakes / 100;
    drive();
  } else {
    speed = 0;
  }
}

function startCar(direction) {
  if (speed === 0) {
    currentDirection = direction;
    speed = 0.01;
  }
}

function checkBoundaries() {
  x = constrain(x, 10, window.innerWidth - 10);
  y = constrain(y, 10, window.innerHeight - 10);
}

function updateRotation() {
  if (rotation > 360) {
    rotation = 0;
  } else if (rotation < 0) {
    rotation = 359;
  }
}

function updateScore() {
  fill(0);
  text('Score: ' + score, -20, -12);
}

function updateCarPosition() {
  rotate(rotation);
  fill(255, 0, 0);
  rect(-15, -10, 30, 20, 5);
  handleCoinCollision();
}

function handleCoinCollision() {
  if (
    x - 15 > coinX - coinSize &&
    x - 15 < coinX + coinSize &&
    y - 10 > coinY - coinSize &&
    y - 10 < coinY + coinSize
  ) {
    spawnCoin();
    score++;
  }
}
