const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const esport = require("../../third_party/eintracht.js");

const options = {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("eintracht")
    .setDescription("Shows all commands."),

  async execute(interaction, client) {
    esport.getScheduleEintracht(function (eintrachtSchedule) {
      let message = "";
      for (let i = 0; i < Object.keys(eintrachtSchedule).length; i++) {
        const originalTime = new Date(eintrachtSchedule[i].startTime);
        const convertedTime = originalTime.toLocaleString("en-US", options);

        message +=
          "🔥: **" +
          eintrachtSchedule[i].match.teams[0].code +
          "** (W:" +
          eintrachtSchedule[i].match.teams[0].record.wins +
          "/" +
          "L:" +
          eintrachtSchedule[i].match.teams[0].record.losses +
          ") " +
          " *vs.* **" +
          eintrachtSchedule[i].match.teams[1].code +
          "** (W:" +
          eintrachtSchedule[i].match.teams[1].record.wins +
          "/" +
          "L:" +
          eintrachtSchedule[i].match.teams[1].record.losses +
          ") " +
          "  🕒  " +
          convertedTime +
          `\n\n`;
      }

      const retEmbed = new EmbedBuilder()
        .setTitle(`🤙 Kommende Spiele von Eintracht Frankfurt 🤙`)
        .setDescription(message)
        .setColor(0x900c3f)
        .setThumbnail(
          "http://static.lolesports.com/teams/1674832854605_SGE.png"
        );

      interaction.reply({
        embeds: [retEmbed],
      });
    });
  },
};
