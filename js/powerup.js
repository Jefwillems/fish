function Powerup() {
  this.size = Math.random() * 50 + 1;
  this.x = random() * width;
  this.y = random() * height;
  this.direction = [random() * 2 - 1, random() * 2 - 1];
}

Powerup.prototype.draw = function() {
  this.update();
  push();
  fill("red");
  ellipse(this.x, this.y, this.size, this.size);
  pop();
};

Powerup.prototype.update = function() {
  this.x = this.x + 1 * this.direction[0];
  this.y = this.y + 1 * this.direction[1];

  if (this.x > width + this.size / 2) {
    this.x = 0;
  }
  if (this.y > height + this.size / 2) {
    this.y = 0;
  }
  if (this.x < 0 - this.size / 2) {
    this.x = width;
  }
  if (this.y < 0 - this.size / 2) {
    this.y = height;
  }
};

Powerup.prototype.getEffect = function(score) {
  return effects[Math.floor(Math.random() * effects.length)];
};
