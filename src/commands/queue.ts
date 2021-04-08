import { Message } from "discord.js";
import { QueueItem } from "../typings/Queue";
import { VariaClient } from "../typings/VariaClient";
import YTFactory from "../core/YTFactory"; 
import { YTData } from "../typings/YTData";

module.exports = {
    name: "queue",
    description: "View queue or queue a song to currently playing music",
    async execute(message: Message, args: string[], client: VariaClient){
        if (args.length == 0){
            if (client.queue.length == 0){
                message.reply('There is nothing currently queued!');
                return;
            } else {
                let queueString: string = '';
                let index: number = 1;
                client.queue.forEach((queueItem: QueueItem) => {
                    queueString += `${index++} ${queueItem.name} ${queueItem.url} ${queueItem.isPlaying ? '✅' : '❌'}\n`;
                });
                message.channel.send('```' + queueString + '```');
                return;
            }
        } else {
            let commandArguments: string = args.join(' ');
            if (!(commandArguments.includes("youtube.com"))){
                let ytData: YTData = await YTFactory.getSongDataByName(commandArguments);
                if (ytData){
                    client.queue.push({name: ytData.title, url: ytData.url, isPlaying: false});
                    message.channel.send(`${message.author.id} queued ${ytData.title}`);
                } else {
                    message.reply('Could not queue your song'); 
                }
            } else {
                let ytData: YTData = await YTFactory.getSongDataById(commandArguments);
                if (ytData){
                    client.queue.push({name: ytData.title, url: ytData.url, isPlaying: false});
                    message.channel.send(`${message.author.id} queued ${ytData.title}`);
                } else {
                    message.reply('Could not queue your song');
                }
            }
        }
    } 
}