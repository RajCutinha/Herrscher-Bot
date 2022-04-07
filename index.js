import "dotenv/config";
import Discord from "discord.js";

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  member.guild.channels.cache
    .get(process.env.ChannelID)
    .send(
      `${member} Willkommen Sterblicher! Hier Regieren deine 3 Herrscher. Hab keine Angst, Sie passen auf dich auf.`
    );
});

client.login(process.env.Token);
