import GlobalSettings from '../global.settings';

export default class Fish {
  constructor(sketch, imgIndex) {
    this.size = Math.random() * 50 + 1;
    const left = Math.random() < 0.5;
    if (left) {
      this.x = Math.random() * 300;
    } else {
      this.x = sketch.width - Math.random() * 300;
    }
    this.y = Math.random() * sketch.height;
    this.currentIndex = imgIndex;
    this.img = GlobalSettings.fish_images[this.currentIndex];
    this.direction = [Math.random() * 2 - 1, Math.random() * 2 - 1];
    this.jpMargin = 12;
  }

  draw(sketch) {
    this.update(sketch);
    sketch.push();
    sketch.imageMode(sketch.CENTER);
    if (GlobalSettings.debug) sketch.ellipse(this.x, this.y, this.size, this.size);
    sketch.image(this.img, this.x, this.y, this.size + this.jpMargin, this.size + this.jpMargin);

    sketch.pop();
  }

  update(sketch) {
    this.x = this.x + 1 * this.direction[0];
    this.y = this.y + 1 * this.direction[1];

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

  reset(sketch, player) {
    this.size = player.size + sketch.random() * 16 - 8;
    // eslint-disable-next-line no-mixed-operators
    this.x = player.cX + (sketch.width / 2 * sketch.random() + 50);
    // eslint-disable-next-line no-mixed-operators
    this.y = player.cY + (sketch.height / 2 * sketch.random() + 50);
    this.direction = [sketch.random() * 2 - 1, sketch.random() * 2 - 1];
  }

  nextImg() {
    this.currentIndex += 1;
    if (this.currentIndex >= GlobalSettings.fish_images.length) {
      this.currentIndex = 0;
    }
    this.img = GlobalSettings.fish_images[this.currentIndex];
  }
}
