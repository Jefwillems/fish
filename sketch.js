var fishes = [];
var powerups = [];
var player;
var MAX_POWERUP_CHANCE;
function setup() {
  createButton("test");
  createCanvas(600, 480).parent("cv-container");
  for (let i = 0; i < 10; i++) {
    var h = height / 10 * i;
    var x = Math.random() * width;
    fishes.push(new Fish(x, h));
  }
  player = new Player();
  MAX_POWERUP_CHANCE = 0.3;
}

function draw() {
  resetCV();
  for (const fish of fishes) {
    fish.draw();
    if (player.canEat(fish)) {
      player.eat(fish);
      handleSpawns();
    }
  }
  for (var i = 0; i < powerups.length; i++) {
    powerups[i].draw();
    if (player.canEat(powerups[i])) {
      player.setPower(powerups[i]);
      powerups.splice(i, 1);
    }
  }
  player.draw();
}

var resetCV = function() {
  clear();
  background(42, 150, 252);
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
