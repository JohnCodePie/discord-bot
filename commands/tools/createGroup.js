const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const GroupManager = require("../../logic/group/groupManager.js");
//write a module that creates a new group and returns the id
//write a module that joins a group by id
//write a module that displays the participants of a group by id (only the names)

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createparty")
    .setDescription("Creates new Party."),

  async execute(interaction, client) {
    const id = await GroupManager.createGroup();
    const retEmbed = new EmbedBuilder()
      .setTitle(`Eine Party wurde erstellt! #${id} 🤙`)
      .setDescription(
        `- Um der Party beizutreten schreibe /join ${id}.` +
          `\n- Um mit der Party eine Radom Teams ARAM runde zu starten schreibe /randomteams.` +
          `\n- Um die Teilnehmer dieser Party zu sehen schreibe /displayparty #ID`
      )
      .setColor(0x900c3f)
      .setThumbnail(interaction.user.displayAvatarURL())
      .setAuthor({
        name: interaction.user.tag,
      });

    await interaction.reply({
      embeds: [retEmbed],
    });
  },
};
