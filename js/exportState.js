function ExportState(gameState, score) {
  this.gameState = gameState;
  this.score = score;
  this.buttons = [];

  var w = width / 2;
  var h = 50;
  var x = width / 2 - w / 2;
  var y = height / 2;
  this.editText = new TextField(x, y, w, h);

  y += 75;
  this.postButton = new MenuButton(x, y, w, h);
  this.postButton.setText("post score");
  this.postButton.setClickHandler(() => {
    console.log("posting score to server");
    var username = this.editText.text;
    var score = this.score;
    var postData = {
      username: username,
      score: score
    };
    httpPost(
      globalSettings.postUrl,
      "json",
      postData,
      function(data) {
        console.log(data);
        gameState.setState(new Menu(gameState));
      },
      function(error) {
        console.error(error);
      }
    );
  });

  this.buttons.push(this.postButton);
  this.buttons.push(this.editText);
}

ExportState.prototype.draw = function() {
  for (var i = 0; i < this.buttons.length; i++) {
    this.buttons[i].draw();
  }
};

ExportState.prototype.mouseClicked = function(mX, mY) {
  if (wasButtonClicked(this.postButton, mX, mY)) {
    this.postButton.click();
  }
};

ExportState.prototype.initSound = function() {};

ExportState.prototype.destroy = function() {};

ExportState.prototype.keyPressed = function(btn) {
  this.editText.keyPressed(btn);
};

ExportState.prototype.keyTyped = function(character) {
  this.editText.keyTyped(character);
};
