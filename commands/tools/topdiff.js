const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { RiotAPI, RiotAPITypes, PlatformId } = require("@fightmegg/riot-api");

const rAPI = new RiotAPI(process.env.RITO_TOKEN);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("topdiff")
    .setDescription("Compare Fleischi with Lord."),

  async execute(interaction, client) {
    const summoner = await rAPI.summoner.getBySummonerName({
      region: PlatformId.EUW1,
      summonerName: "Die Motte",
    });
    const rank = await rAPI.league.getEntriesBySummonerId({
      region: PlatformId.EUW1,
      summonerId: summoner.id,
    });

    const summoner2 = await rAPI.summoner.getBySummonerName({
      region: PlatformId.EUW1,
      summonerName: "LordDumbledore69",
    });
    const rank2 = await rAPI.league.getEntriesBySummonerId({
      region: PlatformId.EUW1,
      summonerId: summoner2.id,
    });

    console.log(summoner.id);
    const matze = rank[0];
    const gamesCount = matze.wins + matze.losses;
    const winRate = (matze.wins / gamesCount).toString().substring(0, 5);

    let message =
      summoner.name +
      " ist: " +
      matze.tier +
      " " +
      matze.rank +
      " " +
      matze.leaguePoints +
      " LP";
    message += `\nMit einer Winrate von: ` + winRate + "%";
    message += `\nBei ${gamesCount} Games`;

    const lord = rank2[0];
    const lordgamesCount = lord.wins + lord.losses;
    const lordwinRate = (lord.wins / lordgamesCount).toString().substring(0, 5);

    message +=
      `\n\n${summoner2.name} ist: ` +
      lord.tier +
      " " +
      lord.rank +
      " " +
      lord.leaguePoints +
      " LP";
    message += `\nMit einer Winrate von: ` + lordwinRate + "%";
    message += `\nBei ${lordgamesCount} Games`;

    const retEmbed = new EmbedBuilder()
      .setTitle("TOP DIFF: ")
      .setDescription("top diff")
      .setColor(0x900c3f)
      .setTimestamp(Date.now())
      .addFields([
        {
          name: summoner.name,
          value:
            matze.tier +
            " " +
            matze.rank +
            " " +
            matze.leaguePoints +
            " LP" +
            `\nMit einer Winrate von: ` +
            winRate +
            "%" +
            `\nBei ${gamesCount} Games`,
          inline: true,
        },
        {
          name: summoner2.name,
          value:
            lord.tier +
            " " +
            lord.rank +
            " " +
            lord.leaguePoints +
            " LP" +
            `\nMit einer Winrate von: ` +
            lordwinRate +
            "%" +
            `\nBei ${lordgamesCount} Games`,
          inline: true,
        },
      ]);

    await interaction.reply({
      embeds: [retEmbed],
    });
  },
};
