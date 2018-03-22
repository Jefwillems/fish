function Enemy() {
  this.x = random() * width;
  this.y = random() * height;
  this.size = globalSettings.enemySize;
  this.direction = [random() * 2 - 1, random() * 2 - 1];
  this.speed = globalSettings.enemySpeed;
}

Enemy.prototype.update = function() {
  this.x = this.x + globalSettings.enemySpeed * this.direction[0];
  this.y = this.y + globalSettings.enemySpeed * this.direction[1];

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

Enemy.prototype.draw = function() {
  this.update();
  push();
  fill("yellow");
  stroke("red");
  strokeWeight(10);
  ellipse(this.x, this.y, this.size, this.size);
  noStroke();
  fill("blue");
  ellipse(this.x, this.y, this.size - 25, this.size - 25);
  if (globalSettings.debug) ellipse(this.x, this.y, this.size, this.size);
  pop();
};
