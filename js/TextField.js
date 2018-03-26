function TextField(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.tS = h - 10;
  this.text = "";
  this.carret = "|";
  this.counter = 0;
  this.treshold = 75;
}

TextField.prototype.draw = function() {
  push();
  rect(this.x, this.y, this.w, this.h);

  textSize(this.tS);
  fill("black");
  textAlign(CENTER, CENTER);
  var tX = this.x + this.w / 2;
  var tY = this.y + this.h / 2;
  if (this.counter > this.treshold / 2) {
    text(this.text + this.carret, tX, tY);
    if (this.counter > this.treshold) this.counter = 0;
  } else {
    text(this.text, tX, tY);
  }

  this.counter++;
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
