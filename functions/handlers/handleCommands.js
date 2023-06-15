const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandsArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandsArray.push(command.data.toJSON());
        console.log(
          `CommandHandler: ${command.data.name} has been added to bot!`
        );
      }

      const clientId = "1117038943632904222";
      const guildId = "272428353645182977";
      const rest = new REST({ version: `9` }).setToken(process.env.TOKEN);
      try {
        await rest.put(Routes.applicationCommands(clientId), {
          body: commandsArray,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
};
