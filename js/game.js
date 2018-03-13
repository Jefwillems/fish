var fishes = [];
var powerups = [];
var player;
var MAX_POWERUP_CHANCE;
var gameOver = false;
function Game() {
  for (var i = 0; i < 30; i++) {
    fishes.push(new Fish());
  }
  player = new Player();
  MAX_POWERUP_CHANCE = 0.2;
}
Game.prototype.draw = function() {
  if (!gameOver) {
    for (var fish of fishes) {
      fish.draw();
      if (player.canEat(fish)) {
        if (player.size >= fish.size) {
          player.eat(fish);
          handleSpawns();
        } else {
          gameOver = true;
        }
      }
    }
    for (var i = 0; i < powerups.length; i++) {
      powerups[i].draw();
      if (player.canEat(powerups[i])) {
        player.addPower(powerups[i]);
        powerups.splice(i, 1);
      }
    }
    player.draw();
  } else {
    push();
    textSize(48);
    textAlign(CENTER, CENTER);
    var t = "Game Over!\nScore: " + player.score;
    var tW = textWidth(t);
    text(t, width / 2, height / 2);
    pop();
  }
};

var getChanceOfSpawningPowerup = function() {
  return round(player.score / 10) * 10 / 100;
};

var maySpawnPowerup = function(chance = MAX_POWERUP_CHANCE) {
  if (chance > MAX_POWERUP_CHANCE) {
    chance = MAX_POWERUP_CHANCE;
  }
  var r = random();
  if (r < chance) {
    powerups.push(new Powerup());
  }
};

var handleSpawns = function() {
  var chance = getChanceOfSpawningPowerup();
  if (chance >= 1) {
    maySpawnPowerup();
  }
  chance = chance - floor(chance);
  maySpawnPowerup(chance);
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
