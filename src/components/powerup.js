import GlobalSettings from '../global.settings';
import { effects } from '../util/effects';

export default class Powerup {
  constructor(sketch, player) {
    this.size = 25;

    this.img = GlobalSettings.powerup;

    const calcPos = (base) => (((base / 2) * sketch.random()) + 50);

    this.x = player.cX + calcPos(sketch.width);
    this.y = player.cY + calcPos(sketch.height);
    this.direction = [sketch.random() * 2 - 1, sketch.random() * 2 - 1];
  }

  draw(sketch) {
    this.update(sketch);
    sketch.push();
    sketch.fill('red');
    // ellipse(this.x, this.y, this.size, this.size);
    sketch.imageMode(sketch.CENTER);
    sketch.image(this.img, this.x, this.y, this.size * 2.23, this.size);
    if (GlobalSettings.debug) sketch.ellipse(this.x, this.y, this.size * 2.3, this.size);
    sketch.pop();
  }

  update(sketch) {
    this.x = this.x + 1 * this.direction[0];
    this.y = this.y + 1 * this.direction[1];

    if (this.x > sketch.width + this.size / 2) {
      this.x = 0;
    }
    if (this.y > sketch.height + this.size / 2) {
      this.y = 0;
    }
    if (this.x < 0 - this.size / 2) {
      this.x = sketch.width;
    }
    if (this.y < 0 - this.size / 2) {
      this.y = sketch.height;
    }
  }

  // eslint-disable-next-line no-unused-vars,class-methods-use-this
  getEffect(score) {
    return effects[Math.floor(Math.random() * effects.length)];
  }
}
