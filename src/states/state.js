import GlobalSettings from '../global.settings';
import Menu from './menu.state';

export default class State {
  constructor(sketch) {
    this.soundOnImg = GlobalSettings.soundOnImg;
    this.soundOffImg = GlobalSettings.soundOffImg;
    this.state = new Menu(sketch, this);
    this.state.initSound();
    const soundOn = localStorage.getItem('soundOn') === 'true'
      || localStorage.getItem('soundOn') === null;
    GlobalSettings.soundOn = soundOn;
    if (!soundOn) {
      sketch.masterVolume(0.0);
    }
  }

  draw(sketch) {
    this.state.draw(sketch);
    sketch.push();
    sketch.imageMode(sketch.CORNER);
    if (GlobalSettings.soundOn) {
      // sketch.image(this.soundOnImg, 5, sketch.height - 55, 50, 50);
    } else {
      // sketch.image(this.soundOffImg, 5, sketch.height - 55, 50, 50);
    }
    sketch.pop();
  }

  setState(s) {
    this.state.destroy();
    this.state = s;
    this.state.initSound();
  }

  mouseClicked(sketch, mX, mY) {
    if (mX > 5 && mX < 55 && mY > sketch.height - 55 && mY < sketch.height - 5) {
      GlobalSettings.soundOn = !GlobalSettings.soundOn;
      if (GlobalSettings.soundOn) {
        sketch.masterVolume(1.0);
        localStorage.setItem('soundOn', true);
      } else {
        sketch.masterVolume(0.0);
        localStorage.setItem('soundOn', false);
      }
      return;
    }
    this.state.mouseClicked(sketch, mX, mY);
  }

  keyTyped(character, sketch) {
    if (typeof this.state.keyTyped === 'function') {
      this.state.keyTyped(character, sketch);
    }
  }

  keyPressed(btn, sketch) {
    if (typeof this.state.keyPressed === 'function') {
      this.state.keyPressed(btn, sketch);
    }
  }
}
