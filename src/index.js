import 'p5/lib/addons/p5.sound.min';
import '../lib/p5.collide2d.min';
import WaterBackground from './background/waterbackground';
import './styles/styles.scss';
import State from './states/state';
import GlobalSettings from './global.settings';

const s = (sketch) => {
  let wbg;
  let gs;

  const resetCv = () => {
    sketch.clear();
    const c = sketch.color(42, 150, 252);
    sketch.background(c);
  };

  sketch.mouseClicked = (ev) => {
    gs.mouseClicked(sketch, ev.x, ev.y);
    return false;
  };

  sketch.keyTyped = () => {
    gs.keyTyped(sketch.key, sketch);
  };

  sketch.keyPressed = () => {
    gs.keyPressed(sketch.keyCode, sketch);
  };

  sketch.windowResized = () => {
    sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
  };

  sketch.preload = () => {
    GlobalSettings.playerImg = sketch.loadImage('./assets/img/Vector-Vis.png');
    GlobalSettings.soundOffImg = sketch.loadImage('./assets/img/sound_off.png');
    GlobalSettings.soundOnImg = sketch.loadImage('./assets/img/sound_on.png');
    GlobalSettings.powerup = sketch.loadImage('./assets/img/powerup.png');

    GlobalSettings.fish_images.push(sketch.loadImage('./assets/img/jp.png'));
    GlobalSettings.fish_images.push(sketch.loadImage('./assets/img/Alain.png'));
    GlobalSettings.fish_images.push(sketch.loadImage('./assets/img/kurkdroog.png'));
    GlobalSettings.fish_images.push(sketch.loadImage('./assets/img/Maggie.png'));
    GlobalSettings.fish_images.push(sketch.loadImage('./assets/img/Hawking.png'));
  };

  sketch.setup = () => {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight).parent('cv-container');
    wbg = new WaterBackground(sketch);
    gs = new State(sketch);
  };
  sketch.draw = () => {
    resetCv();
    wbg.draw(sketch);
    gs.draw(sketch);
  };
};

// eslint-disable-next-line no-unused-vars,new-cap,no-undef,no-var
var app = new p5(s);
