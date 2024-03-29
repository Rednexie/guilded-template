require("dotenv").config()
const { Client, Collection } = require("guilded.js")
const { PermaDB } = require("perma.db")

const path = require("path")
const fs = require("fs")
const os = require("os")



const consoled = require("consoled.js")
const config = require("./config.json")
const cache = require("./modules/cache")

const db = new PermaDB('perma.db', { minimize: true, memory: false, });

const log = require("./modules/log")

consoled.bright.white("--------------------------------------------")
consoled.bright.white("https://github.com/Rednexie/guilded-template")
consoled.bright.white("--------------------------------------------")

let banned;
banned = db.getSync("banned");
banned = banned !== null ? JSON.parse(banned) : []
banned.forEach(ban => {
    cache.set(`ban@${ban}`, true)
})

const token = process.env.TOKEN || config.token


const client = new Client({
  token,
  prefix: config.prefix,
  intents: ["GUILDS", "MESSAGES"],
  cache: {
    channels: true,
    messages: true,
    users: true,
    roles: true,
    teams: true,
    members: true,
  },
  });
try{
    client.login(token)
}
catch(error){
    consoled.bright.red("client login error, please check your token and client.") && process.exit(1)
}

client.commands = new Collection();
client.slashes = new Collection()
client.aliases = new Collection();


const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(command of commandFiles){
    const cmd = require(`./commands/${command}`);
    if(cmd && cmd.config?.name) client.commands.set(cmd.config.name, cmd);
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


consoled.green(`${commandFiles.length} bot ${commandFiles.length > 1 ? "commands" : "command"} loaded.`)
consoled.green(`${commandSubFolders.length} command ${commandSubFolders.length > 1 ? "subfolders" : "subfolder"} readed.`)
consoled.green(`${eventFiles.length} event ${eventFiles.length > 1 ? "listeners" : "listener"} activated.`)
