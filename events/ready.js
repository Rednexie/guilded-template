const path = require("path")
const fs = require("fs")
const os = require("os")

const consoled = require("consoled.js")

const { presence, emote } = require("../config.json")

module.exports = {
  config: {
    name: 'ready',
    once: true,
  },
  execute: async (client) => {
    const servers = await client.fetchServers()
    consoled.cyan(`${client.user.name} is online on ${servers?.size + " " + (servers?.size > 1 ? "servers" : "server")} with a ping of ${client.ws.ping}`);
    client.setStatus({
        content: presence,
        emoteId: emote // download an emoji from emoji.gg > Server Settings > Emotes > Upload Emote > Go to a channel > Emoji icon > Right Click to your emoji > Copy emote ID
    })
  }
}
