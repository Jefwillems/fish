import Announcement from '../util/announcement';

class AnnouncementManager {
  constructor() {
    this.announcements = [];
  }

  draw(sketch) {
    if (this.announcements.length > 0) {
      this.announcements[0].draw(sketch);
    }
  }

  addAnnouncement(text) {
    this.announcements.push(new Announcement(text, this));
  }

  removeAnnouncement(announcement) {
    const i = this.announcements.indexOf(announcement);
    this.announcements.splice(i, 1);
  }
}

export default new AnnouncementManager();
