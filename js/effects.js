var timeouts = [];
var clearTimeouts = function() {
  timeouts.forEach(to => {
    clearTimeout(to);
  });
  timeouts = [];
};
var effects = [
  {
    name: "reverse",
    effect: function(player, sec) {
      if (!player.hasEffect(this.name)) {
        player.speed *= -1;
        var n = this.name;
        soundManager.reverse(player);
        announcementManager.addAnnouncement("Reverse!");
        player.effectText.push(n);
        timeouts.push(
          setTimeout(function() {
            player.speed *= -1;
            soundManager.reverse(player);
            player.removeEffect(n);
          }, sec * 1000)
        );
      }
    }
  },
  {
    name: "slowdown",
    effect: function(player, sec) {
      if (!player.hasEffect(this.name)) {
        player.speed /= 2;
        var n = this.name;
        soundManager.toggleSlow();
        announcementManager.addAnnouncement("Slowdown!");
        player.effectText.push(n);
        timeouts.push(
          setTimeout(function() {
            player.speed *= 2;
            player.removeEffect(n);
            soundManager.toggleSlow();
          }, sec * 1000)
        );
      }
    }
  },
  {
    name: "speedup",
    effect: function(player, sec) {
      if (!player.hasEffect(this.name)) {
        player.speed *= 2;
        var n = this.name;
        player.effectText.push(n);
        soundManager.toggleFast();
        announcementManager.addAnnouncement("Speedup!");
        timeouts.push(
          setTimeout(function() {
            player.speed /= 2;
            player.removeEffect(n);
            soundManager.toggleFast();
          }, sec * 1000)
        );
      }
    }
  },
  {
    name: "double points",
    effect: function(player, sec) {
      if (!player.hasEffect(this.name)) {
        player.pointsMultiplier = 2;
        var n = this.name;
        soundManager.doublePoints();
        announcementManager.addAnnouncement("Double points!");
        player.effectText.push(n);
        timeouts.push(
          setTimeout(function() {
            player.pointsMultiplier = 1;
            player.removeEffect(n);
            soundManager.doublePoints();
          }, sec * 1000)
        );
      }
    }
  }
];
