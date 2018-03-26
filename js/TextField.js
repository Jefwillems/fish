function TextField(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.tS = h - 10;
  this.text = "";
}

TextField.prototype.draw = function() {
  push();
  rect(this.x, this.y, this.w, this.h);

  textSize(this.tS);
  fill("black");
  textAlign(CENTER, CENTER);
  var tX = this.x + this.w / 2;
  var tY = this.y + this.h / 2;
  text(this.text, tX, tY);
  pop();
};
TextField.prototype.keyPressed = function(btn) {
  if (btn === BACKSPACE) {
    this.text = this.text.substring(0, this.text.length - 1);
  }
};
TextField.prototype.keyTyped = function(character) {
  this.text += character;
  push();
  textSize(this.tS);
  var tW = textWidth(this.text);
  if (tW > this.w) {
    this.text = this.text.substring(0, this.text.length - 1);
  }
  pop();
};
