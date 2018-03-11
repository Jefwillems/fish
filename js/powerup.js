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
  return effects[Math.floor(Math.random() * effects.length)];
};

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
  },
  {
    name: "slowdown",
    effect: function(player, sec) {
      if (!player.isSlowedDown) {
        player.speed /= 2;
        player.isSlowedDown = true;
        console.log("slowing down, player speed: ", player.speed);
        setTimeout(function() {
          player.speed *= 2;
          player.isSlowedDown = false;
          console.log("speeding back up, player speed: ", player.speed);
        }, sec * 1000);
      }
    }
  },
  {
    name: "speedup",
    effect: function(player, sec) {
      if (!player.isSpedUp) {
        player.speed *= 2;
        player.isSpedUp = true;
        console.log("speeding up, player speed: ", player.speed);
        setTimeout(function() {
          player.speed /= 2;
          player.isSpedUp = false;
          console.log("speeding back down, player speed: ", player.speed);
        }, sec * 1000);
      }
    }
  }
];
