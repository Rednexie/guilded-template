const path = require("path")
const fs = require("fs")
const os = require("os")

const consoled = require("consoled.js")

const config = require("../config.json")
const { ratelimit, prefix } = require("../config.json")

const cache = require("../modules/cache")

module.exports = {
  config: {
    name: 'messageCreated',
    once: false,
  },


  execute: async (message, client) => {
    if(message.isPrivate) return
    
    if(message.createdById == client.user.id) return;

    if(cache.has(`ban@${message.createdById}`)) return
    // console.log(message)
    //Check if author is a client or the message was sent in dms and return
    // if(message.author.type === 0) return;
    
    
    //get prefix from config and prepare message so it can be read as a command
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    //Check for prefix
    if (!cmd.startsWith(prefix)) return
    if(cache.has(`ratelimit@${message.createdById}`)) return message.reply("rate limited")
    if(!isNaN(Number(ratelimit)) && Number(ratelimit) > 0){
      cache.set(`ratelimit@${message.createdById}`, ratelimit)
      cache.expire(`ratelimit@${message.createdById}`, ratelimit * 1000)
    }
    else{}
    //Get the command from the commands collection and then if the command is found run the command file
    const commandName = cmd.slice(prefix.length)
    let commands = client.commands.get(commandName);
    if (!commands){
      const alias = client.commands.find(cmdFile => cmdFile.config.aliases && cmdFile.config.aliases.includes(commandName))
      if(alias && alias.run && config.alias){
        try {
          await alias.run(client, message, args);
        } catch (error) {
          // Handle any errors
          console.error(error);
          await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
      }
      return
    }
    
    
    try {
      await commands.run(client, message, args);
    } catch (error) {
      // Handle any errors
      console.error(error);
      await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
}
