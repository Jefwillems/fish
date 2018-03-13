var state;
var wbg;
function setup() {
  createCanvas(windowWidth, windowHeight).parent("cv-container");
  wbg = new WaterBackground();
  state = new GameState();
  setTimeout(() => {
    state.setState(new Game());
  }, 2 * 1000);
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
