import {Message, MessageFlags} from "discord.js";
import { Queue } from "../../typings/Queue";
import { VariaClient } from "../../typings/VariaClient";

module.exports = {
    name: "clearqueue",
    description: "Clears all items in the queue",
    args: false,
    usage: '/clearqueue <amount of items to clear>',
    aliases: ['cq', 'clear'],
    cooldown: 5,
    async execute(message: Message, args: string[], client: VariaClient){
        const queue : Queue = client.queue.get(message.guild.id);
        if (queue.items.length){
            if (args.length){
                queue.items.splice(0, parseInt(args[0]));
            } else {
                queue.items = [];
            }
        } else {
            message.reply('There is nothing to clear in the queue!');
        }
    } 
}