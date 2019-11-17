export default class Projectile {
  constructor(fromX, fromY, toX, toY) {
    this.target = { x: toX, y: toY };
    this.source = { x: fromX, y: fromY };
    this.x = this.source.x;
    this.y = this.source.y;
    this.speed = 4;
    this.size = 15;
  }

  update() {
    const vector = {
      x: this.target.x - this.x,
      y: this.target.y - this.y,
    };
    const distance = Math.sqrt((vector.x ** 2 + vector.y ** 2));

    this.x += (vector.x * this.speed) / distance;
    this.y += (vector.y * this.speed) / distance;
  }

  draw(sketch) {
    this.update();
    sketch.push();
    sketch.fill('yellow');
    sketch.ellipse(this.x, this.y, this.size, this.size);
    sketch.pop();
  }

  hasReachedDestination() {
    const reachedX = Math.abs(this.x - this.target.x) < 10;
    const reachedY = Math.abs(this.y - this.target.y) < 10;
    return reachedX && reachedY;
  }
}
