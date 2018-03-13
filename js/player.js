var POWER_DURATION = 10;
function Player() {
  this.cX = 50;
  this.cY = 50;
  this.size = 20;
  this.angle = PI / 2;
  this.img = loadImage("assets/img/fish.png");
  this.movingRight = true;
  this.speed = 3;
  this.score = 0;
  this.effectText = [];
  this.pointsMultiplier = 1;
}
Player.prototype.w = function() {
  return this.size * 2.3;
};

Player.prototype.h = function() {
  return this.size;
};

Player.prototype.move = function() {
  if (keyIsDown(LEFT_ARROW)) {
    this.movingRight = false;
    this.cX -= this.speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    this.movingRight = true;
    this.cX += this.speed;
  }
  if (keyIsDown(UP_ARROW)) {
    this.cY -= this.speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    this.cY += this.speed;
  }
  if (this.cY > height) {
    this.cY = 0;
  } else if (this.cY < 0) {
    this.cY = height;
  }
  if (this.cX > width) {
    this.cX = 0;
  } else if (this.cX < 0) {
    this.cX = width;
  }
};

Player.prototype.draw = function() {
  this.move();
  push();
  var x = this.cX - this.size * 2.3 / 2;
  var y = this.cY - this.size / 2;
  if (!this.movingRight) {
    scale(-1.0, 1.0);
    image(this.img, -1 * x - this.size * 2, y, this.size * 2.3, this.size);
  } else {
    image(this.img, x, y, this.size * 2.3, this.size);
  }
  pop();
  push();
  textSize(32);
  var t = "Score: " + this.score + "\n";
  if (this.effectText.length !== 0) {
    t += "Effects:\n";
  }
  t += this.effectText.join("\n");
  text(t, 10, 30);
  pop();
};

/**
 *
 *
 * @param {Fish} fish
 */
Player.prototype.canEat = function(fish) {
  var hit = collideRectCircle(
    this.cX - this.w() / 2,
    this.cY - this.h() / 2,
    this.size * 2.3,
    this.size,
    fish.x,
    fish.y,
    fish.size,
    fish.size
  );
  return hit;
};

Player.prototype.eat = function(fish) {
  this.size += fish.size / 10;
  fish.reset(this.size);
  this.addScore();
};

/**
 *
 *
 * @param {Powerup} powerup
 */
Player.prototype.addPower = function(powerup) {
  var power = powerup.getEffect(this.score);
  power.effect(this, 10);
};

Player.prototype.hasEffect = function(name) {
  var ret = false;
  for (var i = 0; i < this.effectText.length; i++) {
    if (this.effectText[i] === name) {
      ret = true;
    }
  }
  return ret;
};

Player.prototype.removeEffect = function(name) {
  for (var i = this.effectText.length - 1; i >= 0; i--) {
    if (this.effectText[i] === name) {
      this.effectText.splice(i, 1);
    }
  }
};

Player.prototype.addScore = function() {
  this.score += 1 * this.pointsMultiplier;
};
