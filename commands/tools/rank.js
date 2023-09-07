const { SlashCommandBuilder } = require("discord.js");
const { RiotAPI, RiotAPITypes, PlatformId } = require("@fightmegg/riot-api");

const rAPI = new RiotAPI(process.env.RITO_TOKEN);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("matzerank")
    .setDescription("Shows quick Matzes Rank."),

  async execute(interaction, client) {
    const summoner = await rAPI.summoner.getBySummonerName({
      region: PlatformId.EUW1,
      summonerName: "Die Motte",
    });
    const rank = await rAPI.league.getEntriesBySummonerId({
      region: PlatformId.EUW1,
      summonerId: summoner.id,
    });

    const matze = rank[0];
    const gamesCount = matze.wins + matze.losses;
    const winRate = (matze.wins / gamesCount).toString().substring(0, 5);

    let message = "Matze ist: " + matze.tier + " " + matze.rank;
    message += `\nMit einer Winrate von: ` + winRate + "%";
    message += `\nBei ${gamesCount} Games`;

    await interaction.reply(message);
  },
};
