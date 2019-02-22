let x = 100;
let y = 100;

let speed = 0;
let score;

let rotation = 0;
let currentDirection = '';

let coinX, coinY, coinSize;

let img;

let boost;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);
  img = loadImage('police-car-siren-blue.png');
  this.coinX = random(0, window.innerWidth);
  this.coinY = random(0, window.innerHeight);
  this.coinSize = random(20, 50);
  this.score = 0;
  this.boost = false;
}

// -----------------------------------------------------------------------------

function draw() {
  clear();

  fill(255,255,0);
  ellipse(this.coinX, this.coinY, this.coinSize);

  translate(x,y);

  if (keyIsDown(LEFT_ARROW)) {
    rotation -= speed/100 * 85;
    speed = speed/100 * 93;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    rotation += speed/100 * 85;
    speed = speed/100 * 93;
  }

  if (keyIsDown(UP_ARROW)) {
    speedUp('forward', 8);
  } else if (keyIsDown(DOWN_ARROW)) {
    speedUp('backwards', 4);
  } else {
    slowDown(97);
  }

  if (keyIsDown(SHIFT)){
    boost = true;
  } else {
    boost = false;
  }

  if (rotation > 360) {
      rotation = 0;
  } else if (rotation < 0) {
      rotation = 359;
  }

  if (x >= window.innerWidth - 10) {
    x -= 10;
  } else if (x <= 10) {
    x += 10;
  } else if (y >= window.innerHeight - 10) {
    y -= 10;
  } else if (y <= 10) {
    y += 10;
  }

  rotate(rotation);
  fill(255,0,0);
  rect(-15,-10, 30, 20, 5);

  fill(0);
  text('Score: ' + this.score, -20, -12);

  if (x - 15 > this.coinX - this.coinSize
    && x - 15 <  this.coinX + this.coinSize
    && y - 10 > this.coinY - this.coinSize
    && y - 10 < this.coinY + this.coinSize) {

    this.coinX = random(0, window.innerWidth -10);
    this.coinY = random(0, window.innerHeight -10);
    this.coinSize = random(20, 50);
    this.score ++;
  }
}

// -----------------------------------------------------------------------------

function slowDown(brakes) {
  if (speed >= 0.01) {
    speed = speed/100* brakes;

    if (currentDirection === 'forward') {
      drive();
    } else if (currentDirection === 'backwards') {
      drive();
    }
  } else {
    speed = 0;
  }
}

// -----------------------------------------------------------------------------

function startCar(direction) {
  if (speed === 0) {
    currentDirection = direction;
    speed = 0.01;
  }
}

// -----------------------------------------------------------------------------

function speedUp(direction, maxspeed) {
  startCar(direction);
  if (currentDirection === direction) {
    if (speed <= maxspeed) {
      if (boost) {
        speed = speed/100*130;
      } else {
        speed = speed/100*110;
      }
    }

    if (currentDirection === 'forward') {
      drive();
    } else if (currentDirection === 'backwards') {
      drive();
    }
  } else {
      slowDown(80);
  }
}

// -----------------------------------------------------------------------------

function drive() {
  let relation;
  if (rotation <= 90) {
    relation = (rotation * 100 ) / 90;
    if (currentDirection === 'forward') {
      y += (relation * speed) / 100;
      x += ((100-relation)* speed) / 100;
    } else if (currentDirection === 'backwards') {
      y -= (relation * speed) / 100;
      x -= ((100-relation)* speed) / 100;
    }

  } else if (rotation <= 180) {
    relation = ((rotation - 90) * 100) / 90;
    if (currentDirection === 'forward') {
      y += ((100-relation)* speed) / 100;
      x -= (relation * speed) / 100;
    } else if (currentDirection === 'backwards') {
      y -= ((100-relation)* speed) / 100;
      x += (relation * speed) / 100;
    }

  } else if (rotation <= 270) {
    relation = ((rotation - 180) * 100 ) / 90;
    if (currentDirection === 'forward') {
      y -= (relation * speed) / 100;
      x -= ((100-relation)* speed) / 100;
    } else if (currentDirection === 'backwards') {
      y += (relation * speed) / 100;
      x += ((100-relation)* speed) / 100;
    }

  } else {
    relation = ((rotation - 270) * 100 ) / 90;
    if (currentDirection === 'forward') {
      x += (relation * speed) / 100;
      y -= ((100-relation)* speed) / 100;
    } else if (currentDirection === 'backwards') {
      x -= (relation * speed) / 100;
      y += ((100-relation)* speed) / 100;
    }
  }
}
