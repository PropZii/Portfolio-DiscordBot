module.exports = {
  name: "stop",
  description: "stop the track",
  voiceChannel: true,

  execute({ interaction }) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return interaction.reply({
        content: `No music currently playing ${interaction.member}... try again ? ❌`,
        ephemeral: true,
      });

    queue.destroy();

    interaction.reply({
      content: `Music stopped intero this server, see you next time ✅`,
    });
  },
};
