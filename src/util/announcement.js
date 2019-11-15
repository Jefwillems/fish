export default class Announcement {
  constructor(text, manager) {
    this.text = text;
    this.manager = manager;
    this.maxSize = 72;
    this.textSize = 24;
  }

  draw(sketch) {
    this.update();
    sketch.push();
    sketch.fill('white');
    sketch.stroke(this.textSize);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.textSize(this.textSize);
    sketch.text(this.text, 0, 0, sketch.width, sketch.height);
    sketch.pop();
  }

  update() {
    this.textSize += 0.5;
    if (this.textSize >= this.maxSize) {
      this.destroy();
    }
  }

  destroy() {
    this.manager.removeAnnouncement(this);
  }
}
