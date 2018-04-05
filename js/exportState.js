function ExportState(gameState, score) {
  this.gameState = gameState;
  this.score = score;
}

ExportState.prototype.draw = function() {
  for (var i = 0; i < this.buttons.length; i++) {
    this.buttons[i].draw();
  }
};

ExportState.prototype.mouseClicked = function(mX, mY) {
  if (wasButtonClicked(this.postButton, mX, mY)) {
    this.postButton.click();
  }
};

ExportState.prototype.initSound = function() {};

ExportState.prototype.destroy = function() {};

ExportState.prototype.keyPressed = function(btn) {
  this.editText.keyPressed(btn);
};

ExportState.prototype.keyTyped = function(character) {
  this.editText.keyTyped(character);
};
