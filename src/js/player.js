function Player() {
  this.cX = 50;
  this.cY = 50;
  this.size = Math.random() * 50 + 1;
  this.angle = PI / 2;
  this.img = loadImage("../../assets/img/fish.png");
  this.movingRight = true;
}

Player.prototype.move = function() {
  if (keyIsDown(LEFT_ARROW)) {
    this.movingRight = false;
    this.cX -= 3;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    this.movingRight = true;
    this.cX += 3;
  }
  if (keyIsDown(UP_ARROW)) {
    this.cY -= 3;
  }
  if (keyIsDown(DOWN_ARROW)) {
    this.cY += 3;
  }
};

Player.prototype.draw = function() {
  this.move();
  push();
  if (!this.movingRight) {
    scale(-1.0, 1.0);
  }
  image(this.img, this.cX, this.cY, this.size * 2.3, this.size);
  pop();
};
