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

  this.text = [
    "During their mating season, Jean-Pierre Van Rossems tend to become profoundly aggressive.",
    "Use the arrow keys to navigate Fadry Fish trough",
    "hordes of libidinous, corpulent, neanderthal-like ashtrays and remember:",
    "EAT OR BE EATEN!"
  ];
}

Info.prototype.initSound = function() {};

Info.prototype.draw = function() {
  for (var i = 0; i < this.buttons.length; i++) {
    this.buttons[i].draw();
  }
  push();
  textSize(32);
  var t = this.text.join(" ");
  textAlign(LEFT, CENTER);
  var textMargin = width * 0.2;
  text(t, 0 + textMargin, 0, width - textMargin * 2, height);
  pop();
};

Info.prototype.destroy = function() {};

Info.prototype.mouseClicked = function(mX, mY) {
  for (var i = 0; i < this.buttons.length; i++) {
    if (wasButtonClicked(this.buttons[i], mX, mY)) {
      this.buttons[i].click();
    }
  }
};
