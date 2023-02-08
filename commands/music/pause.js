module.exports = {
  name: "pause",
  description: "pause the track",
  voiceChannel: true,

  execute({ intraction }) {
    const queue = player.getQueue(intraction.guildId);

    if (!queue)
      return intraction.reply({
        content: `No music currently playing ${intraction.member}... try again ? ❌`,
        ephemeral: true,
      });

    if (queue.connection.paused)
      return intraction.reply({
        content: "The track is currently paused!",
        ephemeral: true,
      });

    if (queue.connection.paused)
      return intraction.reply({
        content: `The track is currently paused, ${intraction.member}... try again ? ❌`,
        ephemeral: true,
      });

    const success = queue.setPaused(true);

    return intraction.reply({
      content: success
        ? `Current music ${queue.current.title} paused ✅`
        : `Something went wrong ${intraction.member}... try again ? ❌`,
    });
  },
};
