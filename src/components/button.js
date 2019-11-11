export default class Button {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.tS = h - 10;
  }

  setText(text) {
    this.text = text;
    // const tW = sketch.textWidth(this.text);
    this.tX = this.x + this.w / 2;
    this.tY = this.y + this.h / 2;
  }

  draw(sketch) {
    if (!this.text) {
      throw new Error(
        'MenuButton.draw() was called but no text was specified. Did you forget to call .setText() ?',
      );
    }

    sketch.push();
    sketch.rect(this.x, this.y, this.w, this.h);

    sketch.textSize(this.tS);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.text(this.text, this.tX, this.tY);

    sketch.pop();
  }

  setClickHandler(cb) {
    this.cb = cb;
  }

  click() {
    if (!this.cb) {
      throw new Error(
        'MenuButton.click() was called but no callback was specified. Did you forget to call .setClickHandler() ?',
      );
    }
    this.cb();
  }
}
