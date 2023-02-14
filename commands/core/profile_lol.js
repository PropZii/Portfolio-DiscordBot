require("dotenv").config();
const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "profile",
  description: "Data profile League of Legends",
  options: [
    {
      name: "name",
      description: "The user you want see profile",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  async execute({ interaction }) {
    const name = interaction.options.getString("name");
    if (!name) return;

    //API
    const profile = await axios
      .get(
        "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
          name +
          "?api_key=" +
          process.env.RIOT_KEY
      )
      .catch((err) => {
        return interaction.channel.send("This user doesnt exist");
      });

    if (profile) {
      var summonerId = profile.data.id;
    } else {
      return interaction.channel.send("Try an other user name");
    }

    const summoner = await axios.get(
      "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" +
        summonerId +
        "?api_key=" +
        process.env.RIOT_KEY
    );

    //convert array into object
    function reducer(acc, curr) {
      acc.data = curr;
      return acc;
    }
    const summonerData = summoner.data.reduce(reducer, {});

    //Ranked or Unranked
    let summonerRank;

    if (summonerData.data === undefined) {
      summonerRank = "Unranked";
    } else {
      summonerRank = `${summonerData.data.tier} ${summonerData.data.rank} ${summonerData.data.leaguePoints}LP`;
    }

    let summonerGames;

    if (summonerData.data === undefined) {
      summonerGames = "No games in ranked";
    } else {
      summonerGames = `${summonerData.data.wins + summonerData.data.losses}`;
    }

    let summonerWinrate;

    if (summonerData.data === undefined) {
      summonerWinrate = "No games in ranked";
    } else {
      summonerWinrate = `${
        summonerData.data.wins / summonerData.data.wins +
        summonerData.data.losses
      }%`;
    }

    //Embed
    var embed = new EmbedBuilder()
      .setAuthor({
        name: profile.data.name,
        iconURL:
          "http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/" +
          profile.data.profileIconId +
          ".png",
      })
      .setThumbnail(
        "http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/" +
          profile.data.profileIconId +
          ".png"
      )
      .addFields(
        {
          name: "Niveau d'invocateur",
          value: `${profile.data.summonerLevel}`,
        },
        {
          name: "Rank",
          value: `${summonerRank}`,
        },
        {
          name: "Games",
          value: `${summonerGames}`,
        },
        {
          name: "Winrate",
          value: `${summonerWinrate}`,
        }
      );
    await interaction.channel.send({ embeds: [embed] });
  },
};
