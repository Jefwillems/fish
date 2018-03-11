function Fish(x, y) {
  this.size = Math.random() * 50 + 1;
  this.x = x;
  this.y = y;
  this.direction = [random(), random()];
}

Fish.prototype.draw = function() {
  this.update();
  ellipse(this.x, this.y, this.size, this.size);
};

Fish.prototype.update = function() {
  this.x = this.x + 1 * this.direction[0];
  this.y = this.y + 1 * this.direction[1];

  if (this.x > width + this.size / 2) {
    this.x = 0;
  }
  if (this.y > height + this.size / 2) {
    this.y = 0;
  }
};

Fish.prototype.reset = function(playerSize) {
  var sizeMultiplier = random() * 0.1 + 1;
  this.size *= sizeMultiplier;
  this.x = random() * width;
  this.direction = [random(), random()];
};
