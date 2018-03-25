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

function preload() {
  globalSettings.jeanPierre = loadImage("assets/img/jp.png");
  globalSettings.playerImg = loadImage("assets/img/Vector-Vis.png");
  globalSettings.soundOffImg = loadImage("assets/img/sound_off.png");
  globalSettings.soundOnImg = loadImage("assets/img/sound_on.png");

  soundFormats("wav");
  globalSettings.sound.intro = loadSound("assets/sounds/Intro.wav");
  globalSettings.sound.main = loadSound("assets/sounds/Main.wav");
}
