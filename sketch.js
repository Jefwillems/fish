var state;
var wbg;
function setup() {
  createCanvas(windowWidth, windowHeight).parent("cv-container");
  wbg = new WaterBackground();
  state = new GameState();
}
function draw() {
  resetCV();
  wbg.draw();
  state.draw();
}

var resetCV = function() {
  clear();
  var c;
  c = color(42, 150, 252);
  background(c);
};

function mouseClicked() {
  state.mouseClicked(mouseX, mouseY);
  return false;
}

function keyTyped() {
  state.keyTyped(key);
}

function keyPressed() {
  state.keyPressed(keyCode);
}

function preload() {
  // load images
  globalSettings.playerImg = loadImage("assets/img/Vector-Vis.png");
  globalSettings.soundOffImg = loadImage("assets/img/sound_off.png");
  globalSettings.soundOnImg = loadImage("assets/img/sound_on.png");
  globalSettings.powerup = loadImage("assets/img/powerup.png");

  globalSettings.fish_images.push(loadImage("assets/img/jp.png"));
  globalSettings.fish_images.push(loadImage("assets/img/Alain.png"));
  globalSettings.fish_images.push(loadImage("assets/img/kurkdroog.png"));
  globalSettings.fish_images.push(loadImage("assets/img/Maggie.png"));
  globalSettings.fish_images.push(loadImage("assets/img/Hawking.png"));

  // load sounds
  soundFormats("wav");
  soundManager.addSound("intro", "assets/sounds/Intro.mp3");
  soundManager.addSound("main", "assets/sounds/Main.mp3");
  soundManager.addSound("fast", "assets/sounds/main_fast.mp3");
  soundManager.addSound("slow", "assets/sounds/main_slow.mp3");
  soundManager.addSound("grom", "assets/sounds/grommel.mp3");
  soundManager.addSound("schurk", "assets/sounds/schurk.mp3");
  soundManager.addSound("reverse", "assets/sounds/Main_reverse.mp3");
  soundManager.addSound("double", "assets/sounds/Double_points.mp3");
}
