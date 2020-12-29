import { Message } from "discord.js";
import { VariaClient } from "../typings/VariaClient";
import { getSongByName } from "../utils/yt-factory";

module.exports = {
    name: "queue",
    description: "View queue or queue a song to currently playing music",
    async execute(message: Message, args: string[], client: VariaClient){
        if (args.length == 0){
            if (client.queue.size == 0){
                message.reply('There is nothing currently queued!');
                return;
            } else {
                let queueString: string = '';
                let index: number = 1;
                client.queue.forEach((value: string, key: string) => {
                    queueString += `${index++} ${key} ${value}\n`;
                });
                message.channel.send('```' + queueString + '```');
                return;
            }
        } else {
            let commandArguments: string = args.join(' ');
            if (!(commandArguments.includes("youtube.com"))){
                let ytData: string[] = await getSongByName(commandArguments);
                if (ytData.length){
                    client.queue.set(ytData[0], ytData[1]);
                    message.channel.send(`${message.author.id} queued ${ytData[0]}`);
                } else {
                    message.reply('Could not queue your song'); 
                }
            }
        }
    } 
}