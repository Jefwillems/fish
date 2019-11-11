import GlobalSettings from '../global.settings';

export default class Player {
  constructor(sketch, usrn) {
    this.name = usrn;
    this.size = 20;
    this.cX = sketch.width / 2 + 30 * (sketch.random() * -2 + 1);
    this.cY = sketch.height / 2 + 30 * (sketch.random() * -2 + 1);
    this.angle = sketch.PI / 2;
    this.img = GlobalSettings.playerImg;
    this.movingRight = true;
    this.speed = GlobalSettings.player_base_speed;
    this.score = 0;
    this.effectText = [];
    this.pointsMultiplier = 1;
  }

  w() {
    // Keeping in mind the aspect ratio of the player image
    return this.size * 2.84;
  }

  h() {
    return this.size;
  }

  move(sketch) {
    if (sketch.keyIsDown(sketch.LEFT_ARROW)) {
      this.movingRight = false;
      this.cX -= this.speed;
    }
    if (sketch.keyIsDown(sketch.RIGHT_ARROW)) {
      this.movingRight = true;
      this.cX += this.speed;
    }
    if (sketch.keyIsDown(sketch.UP_ARROW)) {
      this.cY -= this.speed;
    }
    if (sketch.keyIsDown(sketch.DOWN_ARROW)) {
      this.cY += this.speed;
    }
    if (this.cY > sketch.height) {
      this.cY = 0;
    } else if (this.cY < 0) {
      this.cY = sketch.height;
    }
    if (this.cX > sketch.width) {
      this.cX = 0;
    } else if (this.cX < 0) {
      this.cX = sketch.width;
    }
  }

  draw(sketch) {
    this.move(sketch);
    sketch.push();
    const x = this.cX - this.w() / 2;
    const y = this.cY - this.h() / 2;
    sketch.imageMode(sketch.CENTER);
    sketch.rectMode(sketch.CORNER);
    if (!this.movingRight) {
      sketch.scale(-1.0, 1.0);
      sketch.image(this.img, -1 * x, y, this.w(), this.h());
    } else {
      sketch.image(this.img, x, y, this.w(), this.h());
    }
    sketch.pop();
    if (GlobalSettings.debug) sketch.rect(x - this.w() / 2, y - this.h() / 2, this.w(), this.h());
    sketch.push();
    sketch.textSize(32);
    let t = `${this.name}\nScore: ${this.score}\n`;
    if (this.effectText.length !== 0) {
      t += 'Effects:\n';
    }
    t += this.effectText.join('\n');

    sketch.text(t, 10, 30);
    sketch.pop();
    if (!(this.effectText.length === 0)) {
      this.resetStats();
    }
  }

  canEat(sketch, fish) {
    const x = this.cX - this.w() / 2;
    const y = this.cY - this.h() / 2;
    const hit = sketch.collideRectCircle(
      x - this.w() / 2,
      y - this.h() / 2,
      this.w(),
      this.h(),
      fish.x,
      fish.y,
      fish.size,
      fish.size,
    );
    return hit;
  }

  eat(sketch, fish) {
    this.size += 1;
    if (sketch.random() > 0.5) {
      // soundManager.playSound("grom");
    }
    fish.reset(sketch, this);
    this.addScore();
  }

  addPower(powerup) {
    const power = powerup.getEffect(this.score);
    power.effect(this, 10);
  }

  hasEffect(name) {
    let ret = false;
    for (let i = 0; i < this.effectText.length; i += 1) {
      if (this.effectText[i] === name) {
        ret = true;
      }
    }
    return ret;
  }

  removeEffect(name) {
    for (let i = this.effectText.length - 1; i >= 0; i -= 1) {
      if (this.effectText[i] === name) {
        this.effectText.splice(i, 1);
      }
    }
  }

  addScore() {
    this.score += this.pointsMultiplier;
  }

  resetStats() {
    this.speed = GlobalSettings.player_base_speed;
    this.pointsMultiplier = 1;
  }
}
