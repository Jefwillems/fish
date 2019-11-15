import '../lib/p5.collide2d.min';
import WaterBackground from './background/waterbackground';
import './styles/styles.scss';
import State from './states/state';
import GlobalSettings from './global.settings';
import AnnouncementManager from './managers/announcement.manager';
import SoundManager from './managers/sound.manager';

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

    sketch.soundFormats('wav');
    SoundManager.addSound('intro', sketch.loadSound('./assets/sounds/Intro.mp3'));
    SoundManager.addSound('main', sketch.loadSound('./assets/sounds/Main.mp3'));
    SoundManager.addSound('fast', sketch.loadSound('./assets/sounds/main_fast.mp3'));
    SoundManager.addSound('slow', sketch.loadSound('./assets/sounds/main_slow.mp3'));
    SoundManager.addSound('grom', sketch.loadSound('./assets/sounds/grommel.mp3'));
    SoundManager.addSound('schurk', sketch.loadSound('./assets/sounds/schurk.mp3'));
    SoundManager.addSound('reverse', sketch.loadSound('./assets/sounds/Main_reverse.mp3'));
    SoundManager.addSound('double', sketch.loadSound('./assets/sounds/Double_points.mp3'));
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
    AnnouncementManager.draw(sketch);
  };
};

// eslint-disable-next-line no-unused-vars,new-cap,no-undef
const app = new p5(s);
