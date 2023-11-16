module.exports = {
    config: {
      name: "support",
      description: "support",
      usage: "support",
      aliases: ["support","contact","guilded"]
    },
    run: async (client, message, args) => {
      return message.reply("https://guilded.gg/rednexie")
    }
  }
