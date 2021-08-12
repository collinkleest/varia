import { CollectorFilter, Message, MessageEmbed, MessageReaction, User } from "discord.js";
import { VariaClient } from "../typings/VariaClient";
import { YTData } from "../typings/YTData";
import YTFactory from "./YTFactory";
import { QueueItem } from "../typings/QueueItem";
import { Queue } from "../typings/Queue";
import { millisToMinutesAndSeconds } from "../utils/timeutils"; 
import ytdl from "ytdl-core";


class MusicPlayer {

    static async play(client: VariaClient, message: Message): Promise<void>{
        const guildId = message.guild?.id;
        const queue : Queue | undefined = client.queue.get(guildId);
        const queueItems : QueueItem[] | undefined = client.queue.get(guildId)?.items;
        if (!queueItems || !queue ){return;}
        // make sure the queue is empty
        if (queueItems.length){
            // check if song is already playing
            if (!queueItems[0].isPlaying){
                // check if bot is in voice channel if not put it in voice channel
                if (!queue.connection){
                    queue.connection =  await message.member?.voice.channel?.join();
                }
                queue.dispatcher = queue.connection?.play(ytdl(queueItems[0].url));
                queue.dispatcher.setVolume(.2); 
                queueItems[0].isPlaying = true;
                queue.dispatcher?.on('finish', () => {
                    if (!queueItems){return;}
                    // set old song to not playing pop off array and call play func
                    queueItems[0].isPlaying = false;
                    queueItems.shift();
                    this.play(client, message);
                });
                this.playSuccess(message, queueItems[0].name, client);
            } 
        } else {
            queue.connection.disconnect();
            queue.connection = null;
            client.user?.setActivity('commands | /help',{
                type: 'LISTENING'
            });
            console.log("Nothing in the queue to play");
        }
    }
    
    static async playSongByUrl(message: Message, args: string[], client: VariaClient): Promise<void> {
        const guildId = message.guild?.id;
        if (this.defaultChecks(message, args)){
            // implement some url checking in future...
            const ytVideoID : string = args[0].substring(args[0].indexOf("v=") + 2);
            const ytVideoData: YTData = await YTFactory.getSongDataById(ytVideoID);
            client.queue.get(guildId)?.items.push(new QueueItem(ytVideoData.title, ytVideoData.url, ytVideoData.thumbnail, message.author.username, ytVideoData.duration, false));
            this.play(client, message);
        } else {
            console.error('Song check did not pass');
        }
    }

    static async playSongByKeywords(message: Message, args: string[], client: VariaClient){
        const guildId = message.guild?.id;
        if (this.defaultChecks(message, args)){
            const commandArguments: string = args.join(' ');
            const ytVideoData : YTData = await YTFactory.getSongDataByName(commandArguments);
            client.queue.get(guildId)?.items.push(new QueueItem(ytVideoData.title, ytVideoData.url, ytVideoData.thumbnail, message.author.username, ytVideoData.duration, false));
            this.play(client, message);
        } else {
            console.error('Song check did not pass');
        }
    }

    static async playSuccess(message: Message, songTitle: string, client: VariaClient){
        const {author: {username}} = message;
        message.client.user?.setActivity(songTitle, {type: "LISTENING"});
        const messageEmbed = this.buildEmbed(message, songTitle, client);
        message.channel.send(messageEmbed).then((msg) => {
            msg.react('▶');
            msg.react('⏸️');
            msg.react('🛑');
            msg.createReactionCollector(this.getReactionCollector(client, message));
        });
        console.log(`${username} played ${songTitle}`);
    }

    static getReactionCollector(client: VariaClient, message: Message): CollectorFilter {
        const guildId = message.guild?.id;
        const queue = client.queue.get(guildId);
        return (reaction: MessageReaction, user: User) => {
            if (!queue){return false;}
            if (!user.bot){
                if (reaction.emoji.toString() === '▶'){
                    queue.dispatcher.resume();
                } else if (reaction.emoji.toString() === '⏸️'){
                    queue.dispatcher.pause();
                } else if (reaction.emoji.toString() === '🛑'){
                    queue.connection.disconnect();
                    queue.connection = null;
                    if (queue.items.length){
                        queue.items.shift();
                    }
                }
            }
            return true;
        };
    }

    static buildEmbed(message: Message, songTitle: string, client: VariaClient){
        const {author: {username}} = message;
        const songEmbed = new MessageEmbed()
        .setColor('#1C2E4A')
        .setTitle(`${songTitle} is now playing!`)
        .addFields(
            { name: 'Played By', value: username, inline: true },
            { name: 'Duration', value: millisToMinutesAndSeconds(client.queue.get(message.guild?.id)?.items[0].duration), inline: true}
        )   
        .setTimestamp(new Date())
        .setThumbnail(String(client.queue.get(message.guild?.id)?.items[0].thumbnail))
        .setFooter('Varia Music Bot', 'https://raw.githubusercontent.com/collinkleest/varia/master/assets/varialogo.png');
        return songEmbed;
    }

    static defaultChecks(message: Message, args: string[]): boolean {
        const { author: {id, username}} = message;
        const { channel } = message;
        // check if an actual member sent the message
        if (message.member === null ){
            return false;
        }
        // check if user provided arguments
        if (args.length === 0){
            message.reply('/play <song name> / <YouTube URL>');
            return false;
        }
        // check if present in voice channel
        if (message.member.voice.channel){
            return true;
        } else {
            channel.send(`<@${id}>, you must join a voice channel to play music!`);
            console.log(`${username} tried to play music when not in a voice channel`);
            return false;
        }
    }
}

export default MusicPlayer;