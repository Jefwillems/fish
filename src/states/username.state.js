import TextField from '../components/textfield';
import Button from '../components/button';
import GameState from './game.state';
import Player from '../components/player';
import { wasButtonClicked } from '../util';

export default class UsernameState {
  constructor(sketch, state) {
    this.state = state;

    this.elements = [];

    const w = sketch.width / 2;
    const h = 50;
    const x = sketch.width / 2 - w / 2;
    let y = sketch.height / 2;
    this.editText = new TextField(x, y, w, h);

    this.elements.push(this.editText);

    y += 75;
    this.playBtn = new Button(x, y, w, h);
    this.playBtn.setText('Play Game');
    this.playBtn.setClickHandler(() => {
      localStorage.setItem('username', this.editText.text);
      this.state.setState(
        new GameState(sketch, this.state, new Player(this.editText.text)),
      );
    });

    this.elements.push(this.playBtn);
    console.log(this);
  }

  draw(sketch) {
    sketch.push();
    sketch.textSize(32);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    const x = sketch.width / 2;
    const y = sketch.height / 2 - 50;
    sketch.text('Please enter your username', x, y);
    sketch.pop();
    for (let i = 0; i < this.elements.length; i += 1) {
      this.elements[i].draw(sketch);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  destroy() {
    // if (soundManager.isPlaying("intro")) soundManager.stopSound("intro");
  }

  // eslint-disable-next-line class-methods-use-this
  initSound() {}

  keyPressed(btn) {
    this.editText.keyPressed(btn);
  }

  keyTyped(character, sketch) {
    this.editText.keyTyped(character, sketch);
  }

  mouseClicked(sketch, mX, mY) {
    if (wasButtonClicked(sketch, this.playBtn, mX, mY)) {
      this.playBtn.click();
    }
  }
}
