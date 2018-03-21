function Info(gameState) {
  this.gameState = gameState;
  this.buttons = [];

  var bw = width * 0.3;
  var bh = 50;
  var bx = width / 2 - bw / 2;
  var by = height - bh - 50;

  var backBtn = new MenuButton(bx, by, bw, bh);
  backBtn.setText("Back");
  backBtn.setClickHandler(() => {
    this.gameState.setState(new Menu(this.gameState));
  });
  this.buttons.push(backBtn);
  this.text = new TextUtil("\n")
    .append("Catch all the Van Rossems smaller than you!")
    .append("Watch out for the {?enemy name?}")
    .append("Control your fish with the arrow keys (sorry mobile users 😿)")
    .build();
}

Info.prototype.draw = function() {
  for (var i = 0; i < this.buttons.length; i++) {
    this.buttons[i].draw();
  }
  textSize(32);
  textAlign(CENTER);
  text(this.text, width / 2, (height - 100) / 2);
};

Info.prototype.mouseClicked = function(mX, mY) {
  for (var i = 0; i < this.buttons.length; i++) {
    if (wasButtonClicked(this.buttons[i], mX, mY)) {
      this.buttons[i].click();
    }
  }
};
