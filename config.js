require("dotenv").config();

module.exports = {
  app: {
    token: process.env.TOKEN,
    playing: "Bot Music Discord",
    global: true,
    guild: process.env.GUILD_ID,
  },

  opt: {
    DJ: {
      enabled: false,
      roleName: "",
      commands: [],
    },
    maxVol: 100,
    leaveOnEnd: true,
    loopMessage: false,
    spotifyBridge: true,
    defaultvolume: 75,
    discordPlayer: {
      ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      },
    },
  },
};
