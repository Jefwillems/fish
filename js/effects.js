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
