function GameState() {
  this.state = new Menu(this);
}

GameState.prototype.draw = function() {
  this.state.draw();
};

GameState.prototype.setState = function(s) {
  this.state = s;
};

GameState.prototype.mouseClicked = function(mX, mY) {
  this.state.mouseClicked(mX, mY);
};
