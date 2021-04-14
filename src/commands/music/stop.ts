import {Message} from "discord.js";
import { VariaClient } from "../../typings/VariaClient";

module.exports = {
    name: "stop",
    description: "Stops song, removes from queue, and disconnects bot from music channel",
    args: false,
    usage: '/stop',
    aliases: ['st'],
    cooldown: 5,
    async execute(message: Message, args: string[], client: VariaClient){
        if (client.connection){
            client.connection.disconnect();
            if (client.queue.length){
                client.queue.shift();
            }
        } else {
            message.reply('Varia is not active in a voice channel');
        }
    } 
}