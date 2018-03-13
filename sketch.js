var fishes = [];
var powerups = [];
var player;
var wbg;
var MAX_POWERUP_CHANCE;
var gameOver = false;
function setup() {
  createCanvas(windowWidth, windowHeight).parent("cv-container");
  for (let i = 0; i < 30; i++) {
    fishes.push(new Fish());
  }
  player = new Player();
  wbg = new WaterBackground();
  MAX_POWERUP_CHANCE = 0.2;
}

function draw() {
  resetCV();
  wbg.draw();

  if (!gameOver) {
    for (let fish of fishes) {
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
}

var resetCV = function() {
  clear();
  var c;
  c = color(42, 150, 252);
  background(c);
};

var getChanceOfSpawningPowerup = function() {
  return Math.round(player.score / 10) * 10 / 100;
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
  console.log(chance);
  if (chance >= 1) {
    maySpawnPowerup();
  }
  chance = chance - Math.floor(chance);
  maySpawnPowerup(chance);
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
