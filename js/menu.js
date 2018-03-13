function Menu(gameState) {
  this.gameState = gameState;
  this.buttons = [];
  var b = new MenuButton();
}
Menu.prototype.draw = function() {
  for (var i = 0; i < this.buttons.length; i++) {
    this.buttons[i].draw();
  }
};
