//Write a model to leave a group by ID and return a message to the user. Also the participant should be notified that someone left the group.
// Compare this snippet from commands/tools/leaveGroup.js:
const { SlashCommandBuilder } = require("discord.js");
const GroupManager = require("../../logic/group/groupManager.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Leave specific Party.")
    .addStringOption((option) =>
      option
        .setName("partyid")
        .setDescription("Die Party welche du verlassen möchtest!")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const givenID = interaction.options.data[0].value;
    const name = interaction.user.username;
    try {
      await GroupManager.removeParticipant(givenID, name);
      await interaction.reply({
        content: "Du hast die Party verlassen! 😢",
      });
    } catch (error) {
      await interaction.reply({
        content: "❌ " + error.toString(),
      });
      return;
    }
  },
};
