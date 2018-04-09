function SoundManager() {
  this.sounds = Object.create({});
}

SoundManager.prototype.playSound = function(name) {
  this.sounds[name].play();
};
SoundManager.prototype.loopSound = function(name) {
  if (!this.isPlaying(name)) {
    this.sounds[name].loop();
  }
};
SoundManager.prototype.stopSound = function(name) {
  this.sounds[name].stop();
};
SoundManager.prototype.addSound = function(name, path) {
  this.sounds[name] = loadSound(path);
};
SoundManager.prototype.isPlaying = function(name) {
  return this.sounds[name].isPlaying();
};
SoundManager.prototype.reverse = function(player) {
  if (this.isPlaying("reverse")) {
    this.stopAll();
    this.loopSound("main");
  } else {
    if (!globalSettings.gameOver) {
      this.stopAll();
      this.loopSound("reverse");
    }
  }
};
SoundManager.prototype.gameOver = function() {
  this.stopAll();
  this.loopSound("main");
  this.playSound("schurk");
};
SoundManager.prototype.stopAll = function() {
  clearTimeouts();
  for (sound in this.sounds) {
    if (this.isPlaying(sound)) {
      this.stopSound(sound);
    }
  }
};
SoundManager.prototype.doublePoints = function() {
  if (this.isPlaying("double")) {
    this.stopAll();
    this.loopSound("main");
  } else {
    this.stopAll();
    this.loopSound("double");
  }
};

SoundManager.prototype.toggleSlow = function() {
  if (this.isPlaying("slow")) {
    this.stopAll();
    this.loopSound("main");
  } else {
    this.stopAll();
    this.loopSound("slow");
  }
};

SoundManager.prototype.toggleFast = function() {
  if (this.isPlaying("fast")) {
    this.stopAll();
    this.loopSound("main");
  } else {
    this.stopAll();
    this.loopSound("fast");
  }
};
var soundManager = new SoundManager();
