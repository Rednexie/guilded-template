module.exports = {
    config: {
      name: "cmd",
      description: "cmd",
      usage: "cmd"
    },
    run: async (client, message, args) => {
      if(!admins.includes(message.createdById)) return message.reply("only for admins")
      consoled.red(`Exited: ${message.createdById}`)
      return process.exit(0)
    }
  }
