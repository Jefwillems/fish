var jpMargin = 12;
function Fish() {
  this.size = random() * 50 + 1;
  var left = random() < 0.5;
  if (left) {
    this.x = random() * 300;
  } else {
    this.x = width - random() * 300;
  }
  this.y = random() * height;
  this.img = globalSettings.jeanPierre;
  this.direction = [random() * 2 - 1, random() * 2 - 1];
}

Fish.prototype.draw = function() {
  this.update();
  push();
  imageMode(CENTER);
  image(this.img, this.x, this.y, this.size + jpMargin, this.size + jpMargin);
  if (globalSettings.debug) ellipse(this.x, this.y, this.size, this.size);
  pop();
};

Fish.prototype.update = function() {
  this.x = this.x + 1 * this.direction[0];
  this.y = this.y + 1 * this.direction[1];

  if (this.x > width + this.size / 2) {
    this.x = 0;
  }
  if (this.x < 0 - this.size / 2) {
    this.x = width;
  }
  if (this.y > height + this.size / 2) {
    this.y = 0;
  }
  if (this.y < 0 - this.size / 2) {
    this.y = height;
  }
};

Fish.prototype.reset = function(playerSize) {
  this.size = playerSize + random() * 8 - 4;
  this.x = random() * width;
  this.y = random() * height;
  this.direction = [random() * 2 - 1, random() * 2 - 1];
};
