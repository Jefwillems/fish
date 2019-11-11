export default class Bubble {
  constructor(sketch, size) {
    this.xoff = sketch.random() * sketch.width;
    this.size = size;
    this.x = sketch.random() * sketch.width;
    this.y = sketch.height;
    this.speed = sketch.random() * 4;
  }

  draw(sketch) {
    this.update(sketch);
    sketch.push();
    sketch.noStroke();
    sketch.fill('rgba(10,150,33,0.5)');
    sketch.ellipse(this.x, this.y, this.size, this.size);
    sketch.pop();
  }

  update(sketch) {
    this.y -= this.speed;
    if (this.y < 0) {
      this.reset(sketch);
    }
    this.xoff = this.xoff + 0.0025;
    this.x = sketch.noise(this.xoff) * sketch.width;
  }

  reset(sketch) {
    this.y = sketch.height + this.size * 10;
    this.x = sketch.random() * sketch.width;
    this.speed = sketch.random() * 3;
  }
}
