function Menu(gameState) {
  this.gameState = gameState;
  this.buttons = [];

  //play button
  var w = width * 0.3;
  var h = 50;
  var x = width / 2 - w / 2;
  var y = height / 2 - h / 2;

  var playButton = new MenuButton(x, y, w, h);
  playButton.setText("Play Game");
  playButton.setClickHandler(() => {
    var usrn = localStorage.getItem("username");
    if (usrn && usrn.length != 0) {
      if (soundManager.isPlaying("intro")) soundManager.stopSound("intro");
      this.gameState.setState(new Game(this.gameState, new Player(usrn)));
    } else {
      this.gameState.setState(new UsernameState(this.gameState));
    }
  });
  this.buttons.push(playButton);

  // highscores button
  var aboutButton = new MenuButton(x, y + 75, w, h);
  aboutButton.setText("Highscores");
  aboutButton.setClickHandler(() => {
    var win = window.open(globalSettings.aboutUrl, "_blank");
    win.focus();
  });
  this.buttons.push(aboutButton);

  // info button
  var infoBtn = new MenuButton(x, y + 150, w, h);
  infoBtn.setText("Info");
  infoBtn.setClickHandler(() => {
    gameState.setState(new Info(this.gameState));
  });
  this.buttons.push(infoBtn);

  this.title = "Fadry Fish";
}

Menu.prototype.draw = function() {
  push();
  textSize(64);
  textAlign(CENTER, CENTER);
  textFont("Palatino");
  text(this.title, 0, 0, width, height / 2);
  pop();
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

Menu.prototype.destroy = function() {};

var wasButtonClicked = function(button, mX, mY) {
  return collidePointRect(mX, mY, button.x, button.y, button.w, button.h);
};
