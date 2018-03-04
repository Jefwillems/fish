var fishes = [];
var player;
function setup() {
  createButton("test");
  createCanvas(600, 480).parent("cv-container");
  for (let i = 0; i < 10; i++) {
    var h = height / 10 * i;
    var x = Math.random() * width;
    fishes.push(new Fish(x, h));
  }
  player = new Player();
}

var resetCV = function() {
  clear();
  background(42, 150, 252);
};

function draw() {
  resetCV();
  for (const fish of fishes) {
    fish.update();
    fish.draw();
    if (player.canEat(fish)) {
      console.log("eating Jean Pierre");
    }
  }
  player.draw();
}
