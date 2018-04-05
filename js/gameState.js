function GameState() {
  this.soundOnImg = globalSettings.soundOnImg;
  this.soundOffImg = globalSettings.soundOffImg;
  this.state = new Menu(this);
  var soundOn =
    localStorage.getItem("soundOn") === "true" ||
    localStorage.getItem("soundOn") === null;

  globalSettings.soundOn = soundOn;
  if (!soundOn) {
    masterVolume(0.0);
  }
}

GameState.prototype.draw = function() {
  this.state.draw();
  push();
  imageMode(CORNER);
  if (globalSettings.soundOn) {
    image(this.soundOnImg, 5, height - 55, 50, 50);
  } else {
    image(this.soundOffImg, 5, height - 55, 50, 50);
  }
  pop();
};

GameState.prototype.setState = function(s) {
  this.state.destroy();
  this.state = s;
};

GameState.prototype.mouseClicked = function(mX, mY) {
  if (mX > 5 && mX < 55 && mY > height - 55 && mY < height - 5) {
    globalSettings.soundOn = !globalSettings.soundOn;
    if (globalSettings.soundOn) {
      masterVolume(1.0);
      localStorage.setItem("soundOn", true);
    } else {
      masterVolume(0.0);
      localStorage.setItem("soundOn", false);
    }
    return;
  }
  this.state.mouseClicked(mX, mY);
};

GameState.prototype.keyTyped = function(character) {
  if (typeof this.state.keyTyped === "function") {
    this.state.keyTyped(character);
  }
};

GameState.prototype.keyPressed = function(btn) {
  if (typeof this.state.keyPressed === "function") {
    this.state.keyPressed(btn);
  }
};
