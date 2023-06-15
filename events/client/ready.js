const { ActivityType } = require("discord-api-types/v9");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Ready!!! ${client.user.tag} is ready to surfe!`);

    client.user.setActivity({
      name: "/how",
      type: ActivityType.Playing,
    });
  },
};
