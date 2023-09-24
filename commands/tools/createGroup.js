const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const GroupManager = require("../../logic/group/groupManager.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createparty")
    .setDescription("Creates new Party."),

  async execute(interaction, client) {
    await interaction.deferReply();
    try {
      const group = await GroupManager.createGroup();
      const retEmbed = new EmbedBuilder()
        .setTitle(`Eine Party wurde erstellt! #${group.id} 🤙`)
        .setDescription(
          `- Um der Party beizutreten schreibe /join ${group.id}.` +
            `\n- Um mit der Party eine Radom Teams ARAM runde zu starten schreibe /randomteams.` +
            `\n- Um die Teilnehmer dieser Party zu sehen schreibe /displayparty #ID`
        )
        .setColor(0x900c3f)
        .setThumbnail(interaction.user.displayAvatarURL())
        .setAuthor({
          name: interaction.user.tag,
        });

      await interaction.editReply({
        embeds: [retEmbed],
      });
    } catch (error) {
      console.log(error);
      return;
    }
  },
};
