function Menu(gameState) {
  this.gameState = gameState;
  this.buttons = [];
  this.initSound();

  //play button
  var w = width * 0.3;
  var h = 50;
  var x = width / 2 - w / 2;
  var y = height / 2 - h / 2;

  var playButton = new MenuButton(x, y, w, h);
  playButton.setText("Play Game");
  playButton.setClickHandler(() => {
    gameState.setState(new Game(this.gameState));
  });
  this.buttons.push(playButton);

  //about button
  var aboutW = w / 2 - 25;
  var aboutY = y + h + 25;

  var aboutButton = new MenuButton(x, aboutY, aboutW, h);
  aboutButton.setText("About");
  aboutButton.setClickHandler(() => {
    var win = window.open(globalSettings.aboutUrl, "_blank");
    win.focus();
  });
  this.buttons.push(aboutButton);

  // info button
  var infoX = x + w - aboutW;
  var infoBtn = new MenuButton(infoX, aboutY, aboutW, h);
  infoBtn.setText("Info");
  infoBtn.setClickHandler(() => {
    gameState.setState(new Info(this.gameState));
  });
  this.buttons.push(infoBtn);
}

Menu.prototype.draw = function() {
  for (var i = 0; i < this.buttons.length; i++) {
    this.buttons[i].draw();
  }
};

Menu.prototype.mouseClicked = function(mX, mY) {
  for (var i = 0; i < this.buttons.length; i++) {
    if (wasButtonClicked(this.buttons[i], mX, mY)) {
      this.buttons[i].click();
    }
  }
};

Menu.prototype.initSound = function() {
  soundManager.loopSound("intro");
};

Menu.prototype.destroy = function() {
  soundManager.stopSound("intro");
};

var wasButtonClicked = function(button, mX, mY) {
  return collidePointRect(mX, mY, button.x, button.y, button.w, button.h);
};
