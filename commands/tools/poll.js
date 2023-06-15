const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Creates new Poll. For Scrims"),

  async execute(interaction, client) {
    await interaction.reply("Hier wird dran gearbeitet");
    console.log("im here!");
  },
};
