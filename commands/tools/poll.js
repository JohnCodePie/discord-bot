const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Creates new Poll. For Scrims"),

  //creates a new poll where users can vote with reactions for a specific time period (default 1 day) and then the results are displayed in a new message in the same channel as the poll
  async execute(interaction, client) {},
};
