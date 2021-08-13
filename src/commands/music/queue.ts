import { Message, MessageEmbed } from "discord.js";
import YTFactory from "../../core/YTFactory";
import { QueueItem } from "../../typings/QueueItem";
import { VariaClient } from "../../typings/VariaClient";
import { YTData } from "../../typings/YTData";
import { durationToString, millisToMinutesAndSeconds, playtimeToString } from '../../utils/timeutils';

const buildQueueEmbed = (client : VariaClient, message: Message): MessageEmbed => {
    let descriptionText = '';
    const footerText = '';
    let queueDuration  = 0;   
    client.queue.get(message.guild?.id)?.items.forEach( (queueItem: QueueItem, index: number) => {
        let description = index+1 + ' : [' + queueItem.name + ']' + '(' + queueItem.url + ')';
        description += '``' + (queueItem.isPlaying ? playtimeToString(client.queue.get(message.guild?.id)?.dispatcher?.streamTime, queueItem.duration) : durationToString(queueItem.duration)) + '``';  
        description += " " + (queueItem.isPlaying ? '✅' : '❌');
        descriptionText += '\n' + description;
        queueDuration += queueItem.duration;
    });
    descriptionText += '\n' + '\n' + "Queue Time: " + "**" + millisToMinutesAndSeconds(queueDuration) + "**";
    descriptionText += '\n' + "Queue Length: " + "**" + client.queue.get(message.guild?.id)?.items.length + "**";

    const msgEmbed = new MessageEmbed()
    .setTitle("Queue")
    .setColor('#1C2E4A')
    .setDescription(descriptionText)
    .setTimestamp(new Date())
    .setFooter('Varia Music Bot', 'https://raw.githubusercontent.com/collinkleest/varia/master/assets/varialogo.png');
    return msgEmbed;
}


module.exports = {
    name: "queue",
    description: "View queue or queue a song to currently playing music",
    args: false,
    usage: '/queue <youtube url> or <song name>',
    aliases: ['q', 'vq'],
    cooldown: 5,
    async execute(message: Message, args: string[], client: VariaClient){
        const guildId = message.guild?.id;
        if (!args.length){
            if (!client.queue.get(guildId)?.items.length){
                message.reply('There is nothing currently queued!');
                return;
            } else {
                message.channel.send(buildQueueEmbed(client, message));
                return;
            }
        } else {
            const commandArguments: string = args.join(' ');
            if (!(commandArguments.includes("youtube.com"))){
                const ytData: YTData = await YTFactory.getSongDataByName(commandArguments);
                if (ytData){
                    client.queue.get(guildId)?.items.push(new QueueItem(ytData.title, ytData.url, ytData.thumbnail, message.author.username, ytData.duration, false));
                    message.channel.send(`${message.author.id} queued ${ytData.title}`);
                } else {
                    message.reply('Could not queue your song'); 
                }
            } else {
                const ytData: YTData = await YTFactory.getSongDataById(commandArguments);
                if (ytData){
                    client.queue.get(guildId)?.items.push(new QueueItem(ytData.title, ytData.url, ytData.thumbnail, message.author.username, ytData.duration, false));
                    message.channel.send(`${message.author.id} queued ${ytData.title}`);
                } else {
                    message.reply('Could not queue your song');
                }
            }
        }
    } 
}