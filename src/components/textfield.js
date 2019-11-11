export default class TextField {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.tS = h - 10;
    this.text = '';
    this.carret = '|';
    this.counter = 0;
    this.treshold = 75;
  }

  draw(sketch) {
    sketch.push();
    sketch.rect(this.x, this.y, this.w, this.h);

    sketch.textSize(this.tS);
    sketch.fill('black');
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    const tX = this.x + this.w / 2;
    const tY = this.y + this.h / 2;
    if (this.counter > this.treshold / 2) {
      sketch.text(this.text + this.carret, tX, tY);
      if (this.counter > this.treshold) this.counter = 0;
    } else {
      sketch.text(this.text, tX, tY);
    }

    this.counter += 1;
    sketch.pop();
  }

  keyPressed(btn) {
    // sketch.BACKSPACE = 8
    if (btn === 8) {
      this.text = this.text.substring(0, this.text.length - 1);
    }
  }

  keyTyped(character, sketch) {
    this.text += character;
    sketch.push();
    sketch.textSize(this.tS);
    const tW = sketch.textWidth(this.text);
    if (tW > this.w) {
      this.text = this.text.substring(0, this.text.length - 1);
    }
    sketch.pop();
  }
}
