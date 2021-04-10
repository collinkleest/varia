import {Message} from "discord.js";
import { VariaClient } from "../typings/VariaClient";

module.exports = {
    name: "volume",
    description: "Increase or decrease volume <decimal number>",
    async execute(message: Message, args: string[], client: VariaClient){
        let volumeInput : number = parseFloat(args[0]); 
        // check if dispatcher is present
        if (client.dispatcher) {
            client.dispatcher.setVolume(volumeInput);
        } else {
            const {author: {username}} = message;
            message.reply('Cannot change volume when no music is being played!');
            console.log(`${username} tried to change volume when no active music is present`);
        }
    } 
}