import Projectile from './projectile';

export default class Boss {
  constructor(sketch) {
    this.projectTilesRemaining = 20;
    this.currentProjectiles = [];

    this.x = sketch.random() * sketch.width;
    this.y = sketch.random() * sketch.height;
    this.counter = 0;
  }

  update(player) {
    this.counter += 1;

    if (this.counter % 50 === 0) {
      this.shoot(player);
    }
  }

  draw(sketch, player) {
    this.update(player);
    sketch.push();
    sketch.fill('yellow');
    sketch.ellipse(this.x, this.y, 25, 25);
    sketch.pop();
    this.currentProjectiles.forEach((proj) => {
      if (proj.hasReachedDestination()) {
        this.currentProjectiles.shift();
      } else {
        proj.draw(sketch);
      }
    });
  }

  shoot(player) {
    if (!this.outOfProjectiles()) {
      this.currentProjectiles.push(new Projectile(this.x,
        this.y,
        player.center.x,
        player.center.y));
    }
    this.projectTilesRemaining -= 1;
  }

  outOfProjectiles() {
    return this.projectTilesRemaining <= 0;
  }
}
