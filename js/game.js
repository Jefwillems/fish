var fishes = [];
var powerups = [];
var enemies = [];

var player;
var MAX_POWERUP_CHANCE;
var gameOver = false;
function Game(gameState) {
  this.buttons = [];
  this.gameState = gameState;
  for (var i = 0; i < 30; i++) {
    fishes.push(new Fish());
  }
  for (var i = 0; i < random() * 8 + 3; i++) {
    enemies.push(new Enemy());
  }
  player = new Player();
  MAX_POWERUP_CHANCE = 0.2;

  this.restartBtn = new MenuButton(width / 2, height / 2 + 75, 20, 50);

  this.restartBtn.setClickHandler(() => {
    this.gameState.setState(new Menu(this.gameState));
  });
  this.buttons.push(this.restartBtn);
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
    for (var enemy of enemies) {
      enemy.draw();
      if (player.canEat(enemy)) {
        gameOver = true;
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

    t = "Main menu";
    tW = textWidth(t);
    this.restartBtn.setText(t);
    this.restartBtn.draw();
    this.restartBtn.x = width / 2 - tW / 2;
    this.restartBtn.w = tW;
    this.restartBtn.h = 50;
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

Game.prototype.mouseClicked = function(mX, mY) {
  for (var i = 0; i < this.buttons.length; i++) {
    if (wasButtonClicked(this.buttons[i], mX, mY)) {
      this.buttons[i].click();
    }
  }
};
