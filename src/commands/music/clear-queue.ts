import {Message, MessageFlags} from "discord.js";
import { VariaClient } from "../../typings/VariaClient";

module.exports = {
    name: "clearqueue",
    description: "Clears all items in the queue",
    args: false,
    usage: '/clearqueue <amount of items to clear>',
    aliases: ['cq', 'clear'],
    cooldown: 5,
    async execute(message: Message, args: string[], client: VariaClient){
        if (client.queue.length){
            if (args.length){
                client.queue.splice(0, parseInt(args[0]));
            } else {
                client.queue = [];
            }
        } else {
            message.reply('There is nothing to clear in the queue!');
        }
    } 
}