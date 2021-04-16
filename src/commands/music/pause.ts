import { Message } from "discord.js";
import { Queue } from "../../typings/Queue";
import { VariaClient } from "../../typings/VariaClient";

module.exports = {
    name: 'pause',
    description: 'Pause a song that is currently playing',
    args: false,
    usage: '/pause',
    aliases: ['pa'],
    cooldown: 2,
    async execute(message: Message, args: string[], client: VariaClient) {
        const queue : Queue = client.queue.get(message.guild.id);
        if (queue.dispatcher){
            if (queue.dispatcher.paused){
              message.reply(`Song is already paused`);
            }
            queue.dispatcher.pause();
            message.channel.send(`<@${message.author.id}>, paused music!`);
            return;
          } else {
            message.channel.send(`Varia is not currently playing music!`);
            return;
        }
    }
  };