require("dotenv").config();
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { TOKEN } = process.env;
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.commands = new Collection();
client.commandsArray = [];

const functionFolders = fs.readdirSync("./functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
    console.log(`Added ${folder}/${file}`);
  }
}

client.handleCommands();
client.handleEvents();

client.login(TOKEN);
