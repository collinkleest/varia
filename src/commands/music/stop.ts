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
        const queue = client.queue.get(message.guild.id);
        if (queue.connection){
            queue.connection.disconnect();
            queue.connection = null;
            if (queue.items.length){
                queue.items.shift();
            }
        } else {
            message.reply('Varia is not active in a voice channel');
        }
    } 
}