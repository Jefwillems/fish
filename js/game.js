function Game(gameState) {
  this.fishes = [];
  this.powerups = [];
  this.enemies = [];
  this.initSound();

  this.layer;
  this.MAX_POWERUP_CHANCE;
  this.gameOver = false;
  this.buttons = [];
  this.gameState = gameState;
  for (var i = 0; i < 30; i++) {
    this.fishes.push(new Fish());
  }
  for (var i = 0; i < random() * 8 + 3; i++) {
    this.enemies.push(new Enemy());
  }
  this.player = new Player();
  this.MAX_POWERUP_CHANCE = 0.2;

  textSize(40);
  var t = "Main menu";
  var tW = textWidth(t);
  var bW = tW + 45;
  this.restartBtn = new MenuButton(width / 2 - bW / 2, height / 2, bW, 50);
  this.restartBtn.setText(t);
  this.restartBtn.setClickHandler(() => {
    this.gameState.setState(new Menu(this.gameState));
  });
  this.buttons.push(this.restartBtn);

  t = "Export Score";
  tW = textWidth(t);
  this.exportBtn = new MenuButton(width / 2 - bW / 2, height / 2 + 150, bW, 50);
  this.exportBtn.setText(t);
  this.exportBtn.setClickHandler(() => {
    //save("score.jpg");
    this.gameState.setState(new ExportState(this.gameState, this.player.score));
  });
  this.buttons.push(this.exportBtn);

  t = "Play again";
  tW = textWidth(t);
  this.playAgainBtn = new MenuButton(
    width / 2 - bW / 2,
    height / 2 + 75,
    bW,
    50
  );
  this.playAgainBtn.setText(t);
  this.playAgainBtn.setClickHandler(() => {
    this.gameState.setState(new Game(this.gameState), true);
  });
  this.buttons.push(this.playAgainBtn);
}

Game.prototype.draw = function() {
  if (!this.gameOver) {
    for (var fish of this.fishes) {
      fish.draw();
      if (this.player.canEat(fish)) {
        if (this.player.size >= fish.size) {
          this.player.eat(fish);
          this.handleSpawns();
        } else {
          this.gameOver = true;
          soundManager.gameOver();
        }
      }
    }
    for (var enemy of this.enemies) {
      enemy.draw();
      if (this.player.canEat(enemy)) {
        this.gameOver = true;
        soundManager.gameOver();
      }
    }
    for (var i = 0; i < this.powerups.length; i++) {
      this.powerups[i].draw();
      if (this.player.canEat(this.powerups[i])) {
        this.player.addPower(this.powerups[i]);
        this.powerups.splice(i, 1);
      }
    }
    this.player.draw();
  } else {
    push();
    textSize(48);
    textAlign(CENTER, CENTER);
    var t = "Game Over!\nScore: " + this.player.score;
    var tW = textWidth(t);
    text(t, width / 2, height / 2 - 75);
    this.restartBtn.draw();
    this.playAgainBtn.draw();
    this.exportBtn.draw();
    pop();
  }
};

Game.prototype.getChanceOfSpawningPowerup = function() {
  return round(this.player.score / 10) * 10 / 100;
};

Game.prototype.maySpawnPowerup = function(chance = MAX_POWERUP_CHANCE) {
  if (chance > this.MAX_POWERUP_CHANCE) {
    chance = this.MAX_POWERUP_CHANCE;
  }
  var r = random();
  if (r < chance) {
    this.powerups.push(new Powerup());
  }
};

Game.prototype.handleSpawns = function() {
  var chance = this.getChanceOfSpawningPowerup();
  if (chance >= 1) {
    this.maySpawnPowerup();
  }
  chance = chance - floor(chance);
  this.maySpawnPowerup(chance);
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

Game.prototype.initSound = function() {
  soundManager.loopSound("main");
};

Game.prototype.destroy = function() {
  soundManager.stopSound("main");
};
