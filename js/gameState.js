function GameState() {
  this.soundOnImg = globalSettings.soundOnImg;
  this.soundOffImg = globalSettings.soundOffImg;
  this.state = new Menu(this);
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
    } else {
      masterVolume(0.0);
    }
    return;
  }
  this.state.mouseClicked(mX, mY);
};
