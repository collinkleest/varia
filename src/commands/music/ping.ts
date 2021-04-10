import { Message } from "discord.js";

module.exports = {
  name: 'ping',
  description: 'Ping!',
  args: false,
  usage: '/ping',
  execute(message: Message, args: string[]) {
    message.channel.send(`<@${message.author.id}> pinged varia!`);
  }
};