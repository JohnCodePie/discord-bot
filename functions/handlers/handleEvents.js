const fs = require("fs");

module.exports = (client) => {
  client.handleEvents = async () => {
    const eventsFolders = fs.readdirSync("./events");
    for (const folder of eventsFolders) {
      const eventsFiles = fs
        .readdirSync(`./events/${folder}`)
        .filter((file) => file.endsWith(".js"));

      switch (folder) {
        case "client":
          for (const file of eventsFiles) {
            const event = require(`../../events/${folder}/${file}`);

            if (event.once)
              client.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            else
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
          }
          break;

        default:
          break;
      }
    }
  };
};
