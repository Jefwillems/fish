function UsernameState(gamestate) {
  this.gamestate = gamestate;

  this.elements = [];

  var w = width / 2;
  var h = 50;
  var x = width / 2 - w / 2;
  var y = height / 2;
  this.editText = new TextField(x, y, w, h);

  this.elements.push(this.editText);

  y += 75;
  this.playBtn = new MenuButton(x, y, w, h);
  this.playBtn.setText("Play Game");
  this.playBtn.setClickHandler(() => {
    localStorage.setItem("username", this.editText.text);
    this.gamestate.setState(
      new Game(this.gamestate, new Player(this.editText.text))
    );
  });

  this.elements.push(this.playBtn);
}

UsernameState.prototype.draw = function() {
  push();
  textSize(32);
  textAlign(CENTER, CENTER);
  var x = width / 2;
  var y = height / 2 - 50;
  text("Please enter your username", x, y);
  pop();
  for (var i = 0; i < this.elements.length; i++) {
    this.elements[i].draw();
  }
};
UsernameState.prototype.initSound = function() {};
UsernameState.prototype.destroy = function() {
  if (soundManager.isPlaying("intro")) soundManager.stopSound("intro");
};

UsernameState.prototype.keyPressed = function(btn) {
  this.editText.keyPressed(btn);
};

UsernameState.prototype.keyTyped = function(character) {
  this.editText.keyTyped(character);
};
UsernameState.prototype.mouseClicked = function(mX, mY) {
  if (wasButtonClicked(this.playBtn, mX, mY)) {
    this.playBtn.click();
  }
};
