function MenuButton(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.tS = h - 10;
}

MenuButton.prototype.setText = function(text) {
  this.text = text;
  var tW = textWidth(this.text);
  this.tX = this.x + this.w / 2;
  this.tY = this.y + this.h / 2;
};

MenuButton.prototype.draw = function() {
  if (!this.text) {
    throw new Error(
      "MenuButton.draw() was called but no text was specified. Did you forget to call .setText() ?"
    );
  }
  push();
  rect(this.x, this.y, this.w, this.h);

  textSize(this.tS);
  textAlign(CENTER, CENTER);
  text(this.text, this.tX, this.tY);

  pop();
};

MenuButton.prototype.setClickHandler = function(cb) {
  this.cb = cb;
};

MenuButton.prototype.click = function() {
  if (!this.cb) {
    throw new Error(
      "MenuButton.click() was called but no callback was specified. Did you forget to call .setClickHandler() ?"
    );
  }
  this.cb();
};
