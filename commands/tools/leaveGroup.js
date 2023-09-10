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
    const group = await GroupManager.getGroupById(Number(givenID));
    //check if party exsists
    if (!group) {
      await interaction.reply({
        content: "Diese Party exestiert nicht!",
        ephemeral: true,
      });
      return;
    }
    let participants = group.getParticipants();
    const found = participants.find((element) => {
      return element == name;
    });
    if (!found) {
      await interaction.reply({
        content: "Du bist dieser Party nicht beigetreten!",
        ephemeral: true,
      });
      return;
    }
    group.removeParticipant(name);
    await interaction.reply({
      content: "Du hast die Party verlassen! 😢",
    });
  },
};
