function AnnouncementManager() {
  this.announcements = [];
}

AnnouncementManager.prototype.draw = function() {
  if (this.announcements.length > 0) {
    this.announcements[0].draw();
  }
};

AnnouncementManager.prototype.addAnnouncement = function(text) {
  this.announcements.push(new Announcement(text, this));
};

AnnouncementManager.prototype.remove = function(announcement) {
  var i = this.announcements.indexOf(announcement);
  this.announcements.splice(i, 1);
};

function Announcement(text, manager) {
  this.text = text;
  this.manager = manager;
  this.maxSize = 72;
  this.textSize = 24;
}

Announcement.prototype.update = function() {
  this.textSize += 0.5;
  if (this.textSize >= this.maxSize) {
    this.destroy();
  }
};

Announcement.prototype.draw = function() {
  this.update();
  push();
  fill("white");
  stroke(this.textSize);
  textAlign(CENTER, CENTER);
  textSize(this.textSize);
  text(this.text, 0, 0, width, height);
  pop();
};

Announcement.prototype.destroy = function() {
  this.manager.remove(this);
};

var announcementManager = new AnnouncementManager();
