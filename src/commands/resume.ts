import { Message } from "discord.js";
import { VariaClient } from "../typings/VariaClient";
module.exports = {
    name: 'resume',
    description: 'Resume a song that is has been paused',
    async execute(message: Message, args: string[], client: VariaClient) {
      if (client.dispatcher){
        if (!client.dispatcher.paused){
          message.reply(`Song is already playing`);
          return;
        }
        client.dispatcher.resume();
        message.channel.send(`<@${message.author.id}>, resumed music!`);
        return;
      } else {
        message.reply(`Varia is not currently playing music!`);
        return;
      }
    }
  };