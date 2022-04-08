import "dotenv/config";
import Discord from "discord.js";
import http from "http";

const server = http.createServer();
const PORT = +process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Bot Started on PORT:" + PORT);
});

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setPresence({
    status: "online",
    activities: [{ name: "Herrscht über diesen Server" }],
  });
});

client.on("guildMemberAdd", async (member) => {
  member.guild.channels.cache
    .get(process.env.ChannelID)
    .send(
      `${member} Willkommen Sterblicher! Hier Regieren deine 3 Herrscher. Hab keine Angst, Sie passen auf dich auf.`
    );
});

/*
client.on("guildMemberUpdate", async (member) => {
  if (member.id === process.env.ChipsID) {
    member.setNickname("Marvin Destroyer");
  }
});
*/

client.login(process.env.Token);
