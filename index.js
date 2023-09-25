require("dotenv").config()

const { Client, Collection } = require("guilded.js")
const { PermaDB } = require("@rednexie/perma.db")

const path = require("path")
const fs = require("fs")
const os = require("os")


const consoled = require("consoled.js")

const cache = require("./modules/cache")
const db = new PermaDB('perma.db', { minimize: true, memory: false, });

const log = require("./modules/log")


let banned;
banned = db.getSync("banned");
banned = banned !== null ? JSON.parse(banned) : []
banned.forEach(ban => {
    cache.set(`ban@${ban}`, true)
})



const client = new Client({
  // Your bot user's token
  token: process.env.TOKEN,
  // Your bot user's command prefix
  prefix: "!",
  // Your bot user's intents
  intents: ["GUILDS", "MESSAGES"],
  // Your bot user's cache options
  cache: {
    channels: true,
    messages: true,
    users: true,
    roles: true,
    teams: true,
    members: true,
  },
});

client.login(process.env.TOKEN)

client.commands = new Collection();
client.slashes = new Collection()
client.aliases = new Collection();


const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(command of commandFiles){
    const cmd = require(`./commands/${command}`);
    if(cmd && cmd.config?.name) client.commands.set(cmd.config.name, cmd);
}
const slashCommandFiles = fs.readdirSync("./slashes/").filter(file => file.endsWith(".js"))
for(slashCommand of slashCommandFiles){
    const cmd = require(`./slashes/${slashCommand}`);
    client.slashes.set(cmd.config.name, cmd)
}
const eventFiles = fs.readdirSync("./events/").filter(file => file.endsWith(".js"))
for(event of eventFiles){
    const ev = require(`./events/${event}`);
    if(ev.config.once){
        client.once(ev.config.name, (...args) => ev.execute(...args, client))
    }
    else{
        client.on(ev.config.name, (...args) => ev.execute(...args, client))
    }
}


const commandSubFolders = fs.readdirSync("./commands/").filter(folder => !folder.endsWith(".js") && fs.statSync(`./commands/${folder}`).isDirectory())
for(folder of commandSubFolders){
    const commandSubFolderFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"))
    for(command of commandSubFolderFiles){
        const cmd = require(`./commands/${folder}/${command}`)
        client.commands.set(cmd.config.name, cmd)
    }
}

consoled.green(`${slashCommandFiles.length} slash commands loaded.`)
consoled.green(`${commandFiles.length} bot commands loaded.`)
consoled.green(`${commandSubFolders.length} command subfolders readed.`)
consoled.green(`${eventFiles.length} event listeners loaded.`)
consoled.blue("perma.db is only using: " + (fs.statSync("perma.db").size / 1024).toFixed(2) + "kb of the storage")