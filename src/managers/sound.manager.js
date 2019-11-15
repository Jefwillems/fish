import GlobalSettings from '../global.settings';
import { clearTimeOuts } from '../util/effects';

class SoundManager {
  constructor() {
    this.sounds = {};
  }

  playSound(name) {
    this.sounds[name].play();
  }

  loopSound(name) {
    if (!this.isPlaying(name)) this.sounds[name].loop();
  }

  stopSound(name) {
    this.sounds[name].stopAll();
  }

  addSound(name, sound) {
    sound.playMode('sustain');
    this.sounds[name] = sound;
  }

  isPlaying(name) {
    return this.sounds[name].isPlaying() || this.sounds[name].isLooping();
  }

  reverse() {
    if (this.isPlaying('reverse')) {
      this.stopAll();
      this.loopSound('main');
    } else if (!GlobalSettings.gameOver) {
      this.stopAll();
      this.loopSound('reverse');
    }
  }

  gameOver() {
    this.stopAll();
    setTimeout(() => {
      this.loopSound('main');
      this.playSound('schurk');
    }, 100);
  }

  stopAll() {
    clearTimeOuts();
    Object.keys(this.sounds).forEach((name) => {
      if (this.isPlaying(name)) {
        this.stopSound(name);
      }
    });
  }

  doublePoints() {
    if (this.isPlaying('double')) {
      this.stopAll();
      this.loopSound('main');
    } else {
      this.stopAll();
      this.loopSound('double');
    }
  }

  toggleSlow() {
    if (this.isPlaying('slow')) {
      this.stopAll();
      this.loopSound('main');
    } else {
      this.stopAll();
      this.loopSound('slow');
    }
  }

  toggleFast() {
    if (this.isPlaying('fast')) {
      this.stopAll();
      this.loopSound('main');
    } else {
      this.stopAll();
      this.loopSound('fast');
    }
  }
}

export default new SoundManager();
