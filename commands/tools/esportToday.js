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
    .setName("esporttoday")
    .setDescription("Shows esport events today."),

  async execute(interaction, client) {
    esport.getScheduleFavToday(function (eintrachtSchedule) {
      let message = "";
      console.log(eintrachtSchedule);
      for (let i = 0; i < Object.keys(eintrachtSchedule).length; i++) {
        const originalTime = new Date(eintrachtSchedule[i].startTime);
        const convertedTime = originalTime.toLocaleString("en-US", options);

        message +=
          "🔥: **" +
          eintrachtSchedule[i].match.teams[0].name +
          "** (W:" +
          eintrachtSchedule[i].match.teams[0].record.wins +
          "/" +
          "L:" +
          eintrachtSchedule[i].match.teams[0].record.losses +
          ") " +
          " *vs.* **" +
          eintrachtSchedule[i].match.teams[1].name +
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
        .setTitle(`Todays E-Sport Schedule`)
        .setDescription(message)
        .setColor(0x900c3f);

      interaction.reply({
        embeds: [retEmbed],
      });
    });
  },
};
