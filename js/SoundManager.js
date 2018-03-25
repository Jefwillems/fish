function SoundManager() {
  this.sounds = Object.create({});
}

SoundManager.prototype.playSound = function(name) {
  this.sounds[name].play();
};
SoundManager.prototype.loopSound = function(name) {
  this.sounds[name].loop();
};
SoundManager.prototype.stopSound = function(name) {
  this.sounds[name].stop();
};
SoundManager.prototype.addSound = function(name, path) {
  this.sounds[name] = loadSound(path);
};
SoundManager.prototype.setSpeed = function(player) {
  this.sounds["main"].stop();
  this.sounds["fast"].stop();
  this.sounds["slow"].stop();
  if (player.speed === PLAYER_BASE_SPEED) {
    this.loopSound("main");
  } else if (player.speed === PLAYER_BASE_SPEED * 2) {
    this.loopSound("fast");
  } else if (player.speed === PLAYER_BASE_SPEED / 2) {
    this.loopSound("slow");
  } else {
    this.loopSound("main");
  }
};
var soundManager = new SoundManager();
