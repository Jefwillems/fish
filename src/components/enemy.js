import GlobalSettings from '../global.settings';

export default class Enemy {
  constructor(sketch) {
    const top = sketch.random() < 0.5;
    if (top) {
      this.y = sketch.random() * 200;
    } else {
      this.y = sketch.height - sketch.random() * 200;
    }
    this.x = sketch.random() * sketch.width;
    this.size = GlobalSettings.enemySize;
    this.direction = [sketch.random() * 2 - 1, sketch.random() * 2 - 1];
    this.speed = GlobalSettings.enemySpeed;
  }

  update(sketch) {
    this.x = this.x + GlobalSettings.enemySpeed * this.direction[0];
    this.y = this.y + GlobalSettings.enemySpeed * this.direction[1];

    if (this.x > sketch.width + this.size / 2) {
      this.x = 0;
    }
    if (this.x < 0 - this.size / 2) {
      this.x = sketch.width;
    }
    if (this.y > sketch.height + this.size / 2) {
      this.y = 0;
    }
    if (this.y < 0 - this.size / 2) {
      this.y = sketch.height;
    }
  }

  draw(sketch) {
    this.update();
    sketch.push();
    sketch.fill('yellow');
    sketch.stroke('red');
    sketch.strokeWeight(10);
    sketch.ellipse(this.x, this.y, this.size, this.size);
    sketch.noStroke();
    sketch.fill('blue');
    sketch.ellipse(this.x, this.y, this.size - 25, this.size - 25);
    if (GlobalSettings.debug) sketch.ellipse(this.x, this.y, this.size, this.size);
    sketch.pop();
  }
}
