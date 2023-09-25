const sleep = require("../modules/sleep")


module.exports = {
    config: {
      name: "ping",
      description: "ping",
      usage: "!ping",
      aliases: ["ping", "latency", "delay"]
    },
    run: async (client, message, args) => {

  const start = Date.now();
  message.reply('Pinging, getting latency...').then(sent => {
    const end = Date.now();
    const ping = end - start;


    sent.edit({content: `Latency: ${ping}ms\nGuilded.js WebSocket: ${client.ws.ping}`} )
  })
    }
  }
