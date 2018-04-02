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
SoundManager.prototype.gameOver = function() {
  if (!this.isPlaying("main")) {
    this.loopSound("main");
  }
  if (this.isPlaying("fast")) {
    this.sounds["fast"].stop();
  }
  if (this.isPlaying("slow")) {
    this.sounds["slow"].stop();
  }
  this.playSound("schurk");
};
SoundManager.prototype.setSpeed = function(player) {
  if (this.isPlaying("main")) {
    this.sounds["main"].stop();
  }
  if (this.isPlaying("fast")) {
    this.sounds["fast"].stop();
  }
  if (this.isPlaying("slow")) {
    this.sounds["slow"].stop();
  }

  if (player.speed === globalSettings.player_base_speed) {
    this.loopSound("main");
  } else if (player.speed === globalSettings.player_base_speed * 2) {
    this.loopSound("fast");
  } else if (player.speed === globalSettings.player_base_speed / 2) {
    this.loopSound("slow");
  } else {
    this.loopSound("main");
  }
};
var soundManager = new SoundManager();
