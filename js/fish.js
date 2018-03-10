function Fish(x, y) {
  this.size = Math.random() * 50 + 1;
  this.x = x;
  this.y = y;
}

Fish.prototype.draw = function() {
  this.update();
  ellipse(this.x, this.y, this.size, this.size);
};

Fish.prototype.update = function() {
  this.x = this.x + 1;
  if (this.x > width + this.size / 2) {
    this.x = 0;
  }
};

Fish.prototype.reset = function() {
  this.size = Math.random() * 50 + 1;
  this.x = Math.random() * width;
};
