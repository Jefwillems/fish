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
