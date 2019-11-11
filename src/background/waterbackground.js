import Bubble from './bubble';

export default class WaterBackground {
  constructor(sketch) {
    const amountOfBubbles = Math.random() * 20;
    this.bubbles = [];
    for (let i = 0; i < amountOfBubbles; i += 1) {
      this.bubbles.push(new Bubble(sketch, sketch.random() * 40));
    }
  }

  draw(sketch) {
    this.bubbles.forEach((b) => b.draw(sketch));
  }
}
