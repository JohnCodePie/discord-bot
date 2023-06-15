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

    if (found) {
      await interaction.reply({
        content: "Du bist dieser Party schon beigetreten!",
        ephemeral: true,
      });
      return;
    }

    group.addParticipant(name);
    await interaction.reply({
      content: "Du bist der Party beigetreten! 🤙",
      ephemeral: true,
    });
  },
};
