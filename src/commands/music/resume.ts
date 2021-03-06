import { Message } from "discord.js";
import { VariaClient } from "../../typings/VariaClient";
module.exports = {
    name: 'resume',
    description: 'Resume a song that is has been paused',
    args: false,
    usage: '/resume',
    aliases: ['r'],
    cooldown: 5,
    async execute(message: Message, args: string[], client: VariaClient) {
      const queue = client.queue.get(message.guild.id);
      if (queue.dispatcher){
        if (!queue.dispatcher.paused){
          message.reply(`Song is already playing`);
          return;
        }
        queue.dispatcher.resume();
        message.channel.send(`<@${message.author.id}>, resumed music!`);
        return;
      } else {
        message.reply(`Varia is not currently playing music!`);
        return;
      }
    }
  };