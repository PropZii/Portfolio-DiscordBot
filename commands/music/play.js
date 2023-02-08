const { QueryType } = require("discord-player");
const { ApplicationCommandOptionType } = require("discord.js");
module.exports = {
  name: "play",
  description: "play a song!",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "the song you want to play",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  async execute({ interaction }) {
    await interaction.deferReply();
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

    const queue = await player.createQueue(interaction.guild, {
      metadata: interaction.channel,
      spotifyBridge: client.config.opt.spotifyBridge,
      initialVolume: client.config.opt.defaultvolume,
      leaveOnEnd: client.config.opt.leaveOnEnd,
    });

    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel);
    } catch {
      await player.deleteQueue(interaction.guildId);
      return interaction.editReply({
        content: `I can't join the voice channel ${interaction.member}... try again ? ❌`,
        ephemeral: true,
      });
    }

    await interaction.editReply({
      content: `Loading your ${res.playlist ? "playlist" : "track"}... 🎧`,
    });

    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    if (!queue.playing) await queue.play();
  },
};
