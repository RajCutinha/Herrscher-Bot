import "dotenv/config";
import Discord from "discord.js";
import "./utils/server.js";
import "./utils/rss.js";

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES"],
});

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setPresence({
    status: "online",
    activities: [{ name: "Herrscht über diesen Server" }],
  });
});

client.on("guildMemberAdd", async (member) => {
  member.guild.channels.cache
    .get(process.env.ChannelID) /* Change for production */
    .send(
      `${member} Willkommen Sterblicher! Hier Regieren deine 3 Herrscher. Hab keine Angst, Sie passen auf dich auf.`
    );
});

client.on("messageCreate", async (message) => {
  const mentions = Array.from(message.mentions.users);
  let content = message.content;
  const messageType =
    message.type.toLocaleLowerCase() === "REPLY".toLowerCase();

  function messageLength(msgContent) {
    let temp = msgContent;

    mentions.forEach((arrValue) => {
      temp = temp.toString().replace("<@" + arrValue[0] + ">", "");
    });

    return temp.trim().length < 5;
  }

  if (mentions.length >= 1 && messageLength(content) && !messageType) {
    message
      .delete()
      .then((fullfilled) => {
        client.users.cache
          .get(message.author.id)
          .send(
            "Sterblicher! Wage es nicht, diesen Server voll zu spammen, um deine Lust zu befriedigen. Als Herrscher ist es meine Pflicht, meine Untertanen vor deiner Begierde zu schützen. Schreibe das nächste Mal eine Nachricht mit mindestens 5 Zeichen."
          )
          .then((log) => log);
      })
      .catch((err) => err);
  }
});

/*
client.on("guildMemberUpdate", async (member) => {
  if (member.id === process.env.ChipsID) {
    member.setNickname("Marvin Destroyer");
  }
});
*/

/* Change for production */
client.login(process.env.Token);
