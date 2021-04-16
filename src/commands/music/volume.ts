import {Message} from "discord.js";
import { VariaClient } from "../../typings/VariaClient";

module.exports = {
    name: "volume",
    description: "Increase or decrease volume <decimal number>",
    args: false,
    usage: "/volume <number decimal>",
    aliases: ['v', 'level'],
    cooldown: 0,
    async execute(message: Message, args: string[], client: VariaClient){
        const {author: {username}} = message;
        const queue = client.queue.get(message.guild.id);
        if (queue.dispatcher){
            if (args.length){
                const volumeInput : number = parseFloat(args[0]); 
                queue.dispatcher.setVolume(volumeInput);
            } else {
                const volume = queue.dispatcher.volume;
                message.reply(`Current volume is ${volume}`);
            }
        } else {
            message.reply('Cannot change or get volume when no music is being played!');
            console.log(`${username} tried to change or get volume when no active music is present`);
        }
        
    } 
}