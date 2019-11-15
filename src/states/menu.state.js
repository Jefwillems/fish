import Button from '../components/button';
import GlobalSettings from '../global.settings';
import { wasButtonClicked } from '../util';
import GameState from './game.state';
import Player from '../components/player';
import UsernameState from './username.state';
import SoundManager from '../managers/sound.manager';

export default class Menu {
  constructor(sketch, gamestate) {
    this.gamestate = gamestate;
    this.buttons = [];

    // play button
    const w = sketch.width * 0.3;
    const h = 50;
    const x = sketch.width / 2 - w / 2;
    const y = sketch.height / 2 - h / 2;

    const playButton = new Button(x, y, w, h);
    playButton.setText('Play Game');
    playButton.setClickHandler(() => {
      const usrn = localStorage.getItem('username');
      if (usrn && usrn.length !== 0) {
        if (SoundManager.isPlaying('intro')) SoundManager.stopSound('intro');
        this.gamestate.setState(new GameState(sketch, this.gamestate, new Player(sketch, usrn)));
      } else {
        this.gamestate.setState(new UsernameState(sketch, this.gamestate));
      }
    });
    this.buttons.push(playButton);

    // highscores button
    const aboutButton = new Button(x, y + 75, w, h);
    aboutButton.setText('Highscores');
    aboutButton.setClickHandler(() => {
      const win = window.open(GlobalSettings.aboutUrl, '_blank');
      win.focus();
    });
    this.buttons.push(aboutButton);

    // info button
    const infoBtn = new Button(x, y + 150, w, h);
    infoBtn.setText('Info');
    infoBtn.setClickHandler(() => {
      // gameState.setState(new Info(this.gameState));
    });
    this.buttons.push(infoBtn);

    this.title = 'Fadry Fish';
  }

  draw(sketch) {
    sketch.push();
    sketch.textSize(124);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.textFont('Palatino');
    sketch.text(this.title, 0, 0, sketch.width, sketch.height / 2);
    sketch.pop();
    for (let i = 0; i < this.buttons.length; i += 1) {
      this.buttons[i].draw(sketch);
    }
  }

  mouseClicked(sketch, mX, mY) {
    for (let i = 0; i < this.buttons.length; i += 1) {
      if (wasButtonClicked(sketch, this.buttons[i], mX, mY)) {
        this.buttons[i].click();
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  initSound() {
    SoundManager.loopSound('intro');
  }

  // eslint-disable-next-line class-methods-use-this
  destroy() {}
}
