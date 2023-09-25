const { admins } = require("../../config.json")
const consoled = require("consoled.js")

module.exports = {
    config: {
      name: "logout",
      description: "logout",
      usage: "logout"
    },
    run: async (client, message, args) => {
      console.log(message.author.type)
      if(!admins.includes(message.createdById)) return message.reply("only for admins")
      consoled.red(`Logged out: ${message.createdById}`)
      await client.disconnect()

    }
  }
