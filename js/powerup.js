function Powerup() {
  this.size = Math.random() * 50 + 1;
  this.x = random() * width;
  this.y = random() * height;
  this.direction = [random(), random()];
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
};

Powerup.prototype.getEffect = function(score) {
  var effects = [
    {
      name: "reverse",
      effect: function(player, sec) {
        if (!player.isReversed) {
          player.speed *= -1;
          player.isReversed = true;
          console.log("reversing player speed: ", player.speed);
          setTimeout(function() {
            player.speed *= -1;
            player.isReversed = false;
            console.log("reversing player speed: ", player.speed);
          }, sec * 1000);
        }
      }
    }
  ];

  return effects[0];
};
