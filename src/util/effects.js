import AnnouncementManager from '../managers/announcement.manager';
import SoundManager from '../managers/sound.manager';

let timeouts = [];

export const clearTimeOuts = () => {
  timeouts.forEach((to) => {
    clearTimeout(to);
  });
  timeouts = [];
};

export const effects = [
  {
    name: 'reverse',
    effect(player, sec) {
      if (!player.hasEffect(this.name)) {
        player.setSpeed(player.speed * -1);
        const n = this.name;
        SoundManager.reverse(player);
        AnnouncementManager.addAnnouncement('Reverse!');
        player.effectText.push(n);
        timeouts.push(
          setTimeout(() => {
            player.setSpeed(player.speed * -1);
            SoundManager.reverse(player);
            player.removeEffect(n);
          }, sec * 1000),
        );
      }
    },
  },
  {
    name: 'speedup',
    effect(player, sec) {
      if (!player.hasEffect(this.name)) {
        player.setSpeed(player.speed * 2);
        const n = this.name;
        AnnouncementManager.addAnnouncement('Speedup!');
        SoundManager.toggleFast();
        player.effectText.push(n);
        timeouts.push(setTimeout(() => {
          player.setSpeed(player.speed / 2);
          SoundManager.toggleFast();
          player.removeEffect(n);
        }, sec * 1000));
      }
    },
  },
  {
    name: 'slowdown',
    effect(player, sec) {
      if (!player.hasEffect(this.name)) {
        player.setSpeed(player.speed / 2);
        const n = this.name;
        SoundManager.toggleSlow();
        AnnouncementManager.addAnnouncement('Slowdown!');
        player.effectText.push(n);
        timeouts.push(
          setTimeout(() => {
            player.setSpeed(player.speed * 2);
            player.removeEffect(n);
            SoundManager.toggleSlow();
          }, sec * 1000),
        );
      }
    },
  },
  {
    name: 'double points',
    effect(player, sec) {
      if (!player.hasEffect(this.name)) {
        player.pointsMultiplier = 2;
        const n = this.name;
        SoundManager.doublePoints();
        AnnouncementManager.addAnnouncement('Double points!');
        player.effectText.push(n);
        timeouts.push(
          setTimeout(() => {
            player.pointsMultiplier = 1;
            player.removeEffect(n);
            SoundManager.doublePoints();
          }, sec * 1000),
        );
      }
    },
  },
];
