function WaterBackground() {
  var amountBubbles = random() * 20;
  this.bubbles = [];
  for (var i = 0; i < amountBubbles; i++) {
    this.bubbles.push(new Bubble(random() * 40));
  }
}

WaterBackground.prototype.draw = function() {
  this.bubbles.forEach(b => b.draw());
};

function Bubble(size) {
  this.xoff = random() * width;
  this.size = size;
  this.x = random() * width;
  this.y = height;
  this.speed = random() * 3;
}

Bubble.prototype.draw = function() {
  this.update();
  push();
  noStroke();
  fill("rgba(10,150,33,0.5)");
  ellipse(this.x, this.y, this.size, this.size);
  pop();
};

Bubble.prototype.update = function() {
  this.y -= this.speed;
  if (this.y < 0) {
    this.reset();
  }
  this.xoff = this.xoff + 0.0025;
  this.x = noise(this.xoff) * width;
};

Bubble.prototype.reset = function() {
  this.y = height + this.size * 10;
  this.x = random() * width;
  this.speed = random() * 3;
};

function Seaweed() {}

Seaweed.prototype.draw = function() {};
