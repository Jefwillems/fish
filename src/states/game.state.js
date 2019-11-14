import UsernameState from './username.state';
import GlobalSettings from '../global.settings';
import Fish from '../components/fish';
import Enemy from '../components/enemy';
import Button from '../components/button';
// eslint-disable-next-line import/no-cycle
import Menu from './menu.state';
import Player from '../components/player';
import Powerup from '../components/powerup';
import { wasButtonClicked } from '../util';

export default class GameState {
  constructor(sketch, state, player) {
    console.log('starting game');
    if (!player) {
      state.setState(new UsernameState(sketch, state));
    }

    this.fishes = [];
    this.powerups = [];
    this.enemies = [];

    GlobalSettings.gameOver = false;
    this.MAX_POWERUP_CHANCE = 0.2;
    this.buttons = [];

    this.state = state;

    for (let i = 0; i < 30; i += 1) {
      this.fishes.push(new Fish(sketch, 0));
    }
    for (let i = 0; i < sketch.random() * 8 + 3; i += 1) {
      this.enemies.push(new Enemy());
    }
    this.player = player;

    sketch.textSize(40);
    let t = 'Main menu';
    let tW = sketch.textWidth(t);
    const bW = tW + 45;
    this.restartBtn = new Button(sketch.width / 2 - bW / 2, sketch.height / 2, bW, 50);
    this.restartBtn.setText(t);
    this.restartBtn.setClickHandler(() => {
      this.state.setState(new Menu(sketch, this.state));
    });
    this.buttons.push(this.restartBtn);

    t = 'Play again';
    tW = sketch.textWidth(t);
    this.playAgainBtn = new Button(
      sketch.width / 2 - bW / 2,
      sketch.height / 2 + 75,
      bW,
      50,
    );
    this.playAgainBtn.setText(t);
    this.playAgainBtn.setClickHandler(() => {
      this.state.setState(
        new GameState(sketch, this.state, new Player(sketch, this.player.name)),
      );
    });
    this.buttons.push(this.playAgainBtn);
  }

  draw(sketch) {
    if (!GlobalSettings.gameOver) {
      for (let i = 0; i < this.fishes.length; i += 1) {
        const fish = this.fishes[i];
        fish.draw(sketch);
        if (this.player.canEat(sketch, fish)) {
          if (this.player.size >= fish.size) {
            this.player.eat(sketch, fish);
            if (this.player.score % 15 === 0) {
              this.swapFishImages();
            }
            this.handleSpawns(sketch);
          } else {
            this.gameOver();
          }
        }
      }
      for (let i = 0; i < this.enemies; i += 1) {
        const enemy = this.enemies[i];
        enemy.draw(sketch);
        if (this.player.canEat(sketch, enemy)) {
          this.gameOver();
        }
      }
      for (let i = 0; i < this.powerups.length; i += 1) {
        this.powerups[i].draw(sketch);
        if (this.player.canEat(sketch, this.powerups[i])) {
          this.player.addPower(this.powerups[i]);
          this.powerups.splice(i, 1);
        }
      }
      this.player.draw(sketch);
    } else {
      sketch.push();
      sketch.textSize(48);
      sketch.textAlign(sketch.CENTER, sketch.CENTER);
      const t = `Game Over!\nScore: ${this.player.score}`;
      // eslint-disable-next-line no-unused-vars
      const tW = sketch.textWidth(t);
      sketch.text(t, sketch.width / 2, sketch.height / 2 - 75);
      this.restartBtn.draw(sketch);
      this.playAgainBtn.draw(sketch);
      sketch.pop();
    }
  }

  getChanceOfSpawningPowerup() {
    return Math.round(this.player.score / 10) * 0.1;
  }

  maySpawnPowerup(sketch, chance) {
    let actualChance = chance;
    if (actualChance > this.MAX_POWERUP_CHANCE) {
      actualChance = this.MAX_POWERUP_CHANCE;
    }
    const r = Math.random();
    if (r < actualChance) {
      this.powerups.push(new Powerup(sketch, this.player));
    }
  }

  handleSpawns(sketch) {
    let chance = this.getChanceOfSpawningPowerup();
    if (chance >= 1) {
      this.maySpawnPowerup(sketch, this.MAX_POWERUP_CHANCE);
    }
    chance -= Math.floor(chance);
    this.maySpawnPowerup(sketch, chance);
  }

  mouseClicked(sketch, mX, mY) {
    for (let i = 0; i < this.buttons.length; i += 1) {
      if (wasButtonClicked(sketch, this.buttons[i], mX, mY) && GlobalSettings.gameOver) {
        this.buttons[i].click();
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  gameOver() {
    GlobalSettings.gameOver = true;
    // this.postScore();
    // soundManager.gameOver();
  }

  // eslint-disable-next-line class-methods-use-this
  initSound() {
    // soundManager.loopSound("main");
  }

  // eslint-disable-next-line class-methods-use-this
  destroy() {
    // soundManager.stopSound("main");
  }

  // eslint-disable-next-line class-methods-use-this
  postScore() {
  /*  return new Promise((resolve, reject) => {
      const username = this.player.name;
      const { score } = this.player;
      const postData = { username, score };
      httpPost(
        globalSettings.postUrl,
        'json',
        postData,
        (data) => {
          console.log(data);
          // gameState.setState(new Menu(gameState));
        },
        (error) => {
          console.error(error);
        },
      );
    }).then(console.log); */
  }

  swapFishImages() {
    return new Promise(() => {
      for (let i = 0; i < this.fishes.length; i += 1) {
        setTimeout(() => {
          this.fishes[i].nextImg();
        }, i * 20);
      }
    });
  }
}
