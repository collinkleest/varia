import { Message } from "discord.js";
import { VariaClient } from "../../typings/VariaClient";

module.exports = {
  name: 'ping',
  description: 'Ping!',
  args: false,
  usage: '/ping',
  aliases: ['pi'],
  cooldown: 5,
  execute(message: Message, args: string[], client: VariaClient) {
    const {author: {id, username}} = message;
    const {ws : {ping}} = client;
    message.channel.send(`<@${id}> Varia is active with ${ping}ms ping`);
    console.log(`${username} pinged varia responding with ${ping}ms ping`);
  }
};