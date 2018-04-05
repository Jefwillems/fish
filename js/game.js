function Game(gameState, player) {
  if (!player) {
    gameState.setState(new UsernameState(gameState));
  }
  this.fishes = [];
  this.powerups = [];
  this.enemies = [];
  this.initSound();
  globalSettings.gameOver = false;
  this.MAX_POWERUP_CHANCE = 0.2;
  this.buttons = [];
  this.gameState = gameState;
  for (var i = 0; i < 30; i++) {
    this.fishes.push(new Fish(0));
  }
  for (var i = 0; i < random() * 8 + 3; i++) {
    this.enemies.push(new Enemy());
  }
  this.player = player;

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
    this.gameState.setState(
      new Game(this.gameState, new Player(this.name)),
      true
    );
  });
  this.buttons.push(this.playAgainBtn);
}

Game.prototype.draw = function() {
  if (!globalSettings.gameOver) {
    for (var fish of this.fishes) {
      fish.draw();
      if (this.player.canEat(fish)) {
        if (this.player.size >= fish.size) {
          this.player.eat(fish);
          if (this.player.score % 15 === 0) {
            this.swapFishImages();
          }
          this.handleSpawns();
        } else {
          this.gameOver();
        }
      }
    }
    for (var enemy of this.enemies) {
      enemy.draw();
      if (this.player.canEat(enemy)) {
        this.gameOver();
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
    this.powerups.push(new Powerup(this.player));
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
    if (wasButtonClicked(this.buttons[i], mX, mY) && globalSettings.gameOver) {
      this.buttons[i].click();
    }
  }
};
Game.prototype.gameOver = function() {
  globalSettings.gameOver = true;
  soundManager.gameOver();
};

Game.prototype.initSound = function() {
  soundManager.loopSound("main");
};

Game.prototype.destroy = function() {
  soundManager.stopSound("main");
};

Game.prototype.postScore = function() {
  return new Promise((resolve, reject) => {
    var username = this.editText;
    var score = this.score;
    var postData = { username: username.text, score: score };
    httpPost(
      globalSettings.postUrl,
      "json",
      postData,
      function(data) {
        console.log(data);
        gameState.setState(new Menu(gameState));
      },
      function(error) {
        console.error(error);
      }
    );
  }).then(console.log);
};

Game.prototype.swapFishImages = function() {
  new Promise((resolve, reject) => {
    for (let i = 0; i < this.fishes.length; i++) {
      setTimeout(() => {
        this.fishes[i].nextImg();
      }, i * 20);
    }
  });
};
