const { SlashCommandBuilder } = require("discord.js");
const GroupManager = require("../../logic/group/groupManager.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Join specific Party.")
    .addStringOption((option) =>
      option
        .setName("partyid")
        .setDescription("Die Party welcher du joinen möchtest!")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const givenID = interaction.options.data[0].value;
    const name = interaction.user.username;

    try {
      await GroupManager.addParticipant(givenID, name);
      await interaction.reply({
        content: "Du bist der Party beigetreten! 🤙",
      });
    } catch (error) {
      await interaction.reply({
        content: "❌ " + error.toString(),
      });
      return;
    }
  },
};
