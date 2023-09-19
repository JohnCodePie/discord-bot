const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const GroupManager = require("../../logic/group/groupManager.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("displayparty")
    .setDescription("Displays a specific Party.")
    .addStringOption((option) =>
      option
        .setName("partyid")
        .setDescription("Welche Party du anzeigen möchtest!")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const givenID = interaction.options.data[0].value;
    await interaction.deferReply({ ephemeral: true });
    try {
      const participants = await GroupManager.getParticipantsByGroupID(givenID);

      let namesValue = "Gähnende Leere! 😢";
      if (participants.length > 0) namesValue = participants.join("\n");

      const retEmbed = new EmbedBuilder()
        .setTitle(`Infos zur Party! 🤙 #${givenID}`)
        .setDescription(
          `- Um der Party beizutreten schreibe /join ${givenID}.  \n`
        )
        .setColor(0x900c3f)
        .setThumbnail(interaction.user.displayAvatarURL())
        .addFields([
          {
            name: `Teilnehmer: [${participants.length}] `,
            value: namesValue,
            inline: true,
          },
        ]);

      await interaction.editReply({
        embeds: [retEmbed],
      });
    } catch (error) {
      await interaction.editReply({
        content: "❌ " + error.toString(),
      });
      return;
    }
  },
};
