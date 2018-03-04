function Player() {
  this.cX = 50;
  this.cY = 50;
  this.size = Math.random() * 50 + 1;
  this.angle = PI / 2;
  this.img = loadImage("assets/img/fish.png");
  this.movingRight = true;
  this.speed = 3;
}

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
};

/**
 *
 *
 * @param {Fish} fish
 */
Player.prototype.canEat = function(fish) {
  var centroidDistance = Math.sqrt(
    Math.pow(this.cX - fish.x, 2) + Math.pow(this.cY - fish.y, 2)
  );
  if (centroidDistance < this.size / 2 + fish.size) {
    return true;
  }
  return false;
};
