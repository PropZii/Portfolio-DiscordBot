const { ApplicationCommandOptionType } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
  name: "next",
  description: "song you want to playnext",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "the song you want to playnext",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  async execute({ interaction }) {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return interaction.editReply({
        content: `No music currently playing ${interaction.member}... try again ? ❌`,
        ephemeral: true,
      });

    const song = interaction.options.getString("song");

    const res = await player.search(song, {
      requestedBy: interaction.member,
      searchEngine: QueryType.AUTO,
    });

    if (!res || !res.tracks.length)
      return interaction.editReply({
        content: `No results found ${interaction.member}... try again ? ❌`,
        ephemeral: true,
      });

    if (res.playlist)
      return interaction.editReply({
        content: `This command dose not support playlist's ${interaction.member}... try again ? ❌`,
        ephemeral: true,
      });

    queue.insert(res.tracks[0], 0);

    await interaction.editReply({
      content: `Track has been inserted into the queue... it will play next 🎧`,
    });
  },
};
