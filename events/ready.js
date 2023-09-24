const path = require("path")
const fs = require("fs")
const os = require("os")

const consoled = require("consoled.js")

const presence = process.env.PRESENCE

module.exports = {
  config: {
    name: 'ready',
    once: true,
  },
  execute: async (client) => {

    const servers = await client.fetchServers()
    consoled.cyan("guilded.gg bot is ready!")
    client.setStatus({
        content: "guilded.gg rednexie",
        emoteId: "2060637"
    })
  }
}
