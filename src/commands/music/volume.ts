import {Message} from "discord.js";
import { VariaClient } from "../../typings/VariaClient";

module.exports = {
    name: "volume",
    description: "Increase or decrease volume <decimal number>",
    args: false,
    usage: "/volume <number decimal>",
    async execute(message: Message, args: string[], client: VariaClient){
        const {author: {username}} = message;
        if (client.dispatcher){
            if (args.length){
                const volumeInput : number = parseFloat(args[0]); 
                client.dispatcher.setVolume(volumeInput);
            } else {
                const volume = client.dispatcher?.volume;
                message.reply(`Current volume is ${volume}`);
            }
        } else {
            message.reply('Cannot change or get volume when no music is being played!');
            console.log(`${username} tried to change or get volume when no active music is present`);
        }
        
    } 
}