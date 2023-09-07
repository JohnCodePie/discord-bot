const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const GroupManager = require("../../logic/group/groupManager.js");
const utils = require("../../utils/shuffle.js");
const callFactory = require("../../utils/callFactory.js");
const { RiotAPI, RiotAPITypes, PlatformId } = require("@fightmegg/riot-api");
const rAPI = new RiotAPI(process.env.RITO_TOKEN);
const { DDragon } = require("@fightmegg/riot-api");

const ddragon = new DDragon();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("randomteams")
    .setDescription("Creates random Teams.")
    .addStringOption((option) =>
      option
        .setName("partyid")
        .setDescription("Aus welcher Party die Teilnehmer gemischt werden")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const givenID = interaction.options.data[0].value;
    const group = await GroupManager.getGroupById(Number(givenID));

    //check if party exsists
    if (!group) {
      await interaction.reply({
        content: "Diese Party exestiert nicht!",
        ephemeral: true,
      });
      return;
    }

    const participants = group.getParticipants();

    //check if party exsists
    if (participants.length == 0 || participants.length == 1) {
      await interaction.reply({
        content: `Diese Party hat keine bzw. zu wenige Teilnehmer! Teilnehmer: ${participants.length}/2 `,
        ephemeral: true,
      });
      return;
    }

    let randomTeams = utils.shuffle(participants);
    var half_length = Math.ceil(randomTeams.length / 2);
    var leftSide = randomTeams.slice(0, half_length);
    var rightSide = randomTeams.slice(half_length, randomTeams.length);

    let champs = (await ddragon.champion.all()).data;
    let selected = utils.shuffle(
      Object.values(champs).map((champion) => ({
        id: champion.id,
        key: champion.key,
      }))
    );

    selected = selected.slice(0, participants.length * 3);
    selected = Object.values(selected).map((champion) => ({
      id: champion.id,
      key: champion.key,
      message: "",
    }));
    for (const champion of selected) {
      const seed = await callFactory.getSeedId(champion.key);
      champion.message =
        "[" +
        champion.id +
        "]" +
        "(https://www.ultimate-bravery.net/Classic?s=" +
        seed +
        ")";
    }

    var halfLenghtChamps = Math.ceil(selected.length / 2);
    var leftSideChamps = selected.slice(0, halfLenghtChamps);
    var rightSideChamps = selected.slice(halfLenghtChamps, selected.length);

    const championNamesLeft = leftSideChamps.map(
      (champion) => champion.message
    );
    const outputStringLeft = championNamesLeft.join(", ");

    const championNamesRight = rightSideChamps.map(
      (champion) => champion.message
    );
    const outputStringRight = championNamesRight.join(", ");

    const retEmbed = new EmbedBuilder()
      .setTitle("🏆 Die Teams sind: 🤙")
      .setDescription(
        `Hier sind die Teams. Darunter hat jedes Team einen Champion-Pool aus denen das Team picken kann.`
      )
      .setColor(0x900c3f)
      .setTimestamp(Date.now())
      .addFields([
        {
          name: "Team 1",
          value: leftSide.toString() + `\n\n ${outputStringLeft}`,
          inline: true,
        },
        {
          name: "Team 2",
          value: rightSide.toString() + `\n\n ${outputStringRight}`,
          inline: true,
        },
      ]);

    await interaction.reply({
      embeds: [retEmbed],
    });
  },
};
