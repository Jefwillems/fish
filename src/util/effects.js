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
        // soundManager.reverse(player);
        // announcementManager.addAnnouncement('Reverse!');
        player.effectText.push(n);
        timeouts.push(
          setTimeout(() => {
            player.setSpeed(player.speed * -1);
            // soundManager.reverse(player);
            player.removeEffect(n);
          }, sec * 1000),
        );
      }
    },
  },
];
