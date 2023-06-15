const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("how")
    .setDescription("Shows all commands."),

  async execute(interaction, client) {
    const retEmbed = new EmbedBuilder()
      .setTitle(`🤙 Sardellendosen Butler 🤙`)
      .setDescription(
        `⚡ **/createparty** -> *Um eine Party zu erstellen.*` +
          `\n⚡ **/join #ID** -> *Um der Party beizutreten.*` +
          `\n⚡ **/displayparty #ID** -> *Um die Teilnehmer der Party zu sehen.*` +
          `\n⚡ **/randomteams #ID** -> *Um mit den Teilnehmern einer Party eine zufällige Teamaufstellung zu generieren. Gleichzeitig werden euch auch zufällige Champs vorgeschlagen.* ` +
          `\n⚡ **/esporttoday** -> *Um die heutigen Spiele zu sehen.*` +
          `\n⚡ **/eintracht** -> *Um die upcoming games von Eintracht Frankfurt zu bekommen.*` +
          `\n⚡ **/rank** -> *Um den rank von Matze schnell zu eruieren.*` +
          `\n⚡ **/topdiff** -> *Um die rank difference ziwschen Matze und Lord schnell zu eruieren.*`
      )
      .setColor(0x900c3f);

    await interaction.reply({
      embeds: [retEmbed],
    });
  },
};
