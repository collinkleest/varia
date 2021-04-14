import { Collection, CollectorFilter, DiscordAPIError, Message, MessageEmbed, MessageReaction, ReactionCollector, User } from "discord.js";
import { VariaClient } from "../typings/VariaClient";
import { YTData } from "../typings/YTData";
import YTFactory from "./YTFactory";
import { QueueItem } from "../typings/QueueItem";
import { millisToMinutesAndSeconds } from "../utils/timeutils"; 
const ytdl =  require("ytdl-core");


class MusicPlayer {

    constructor(){}

    static async play(client: VariaClient, message: Message): Promise<void>{
        // make sure the queue is empty
        if (client.queue.length){
            // check if song is already playing
            if (!client.queue[0].isPlaying){
                // check if bot is in voice channel if not put it in voice channel
                if (!client.connection){
                    client.connection =  await message.member?.voice.channel?.join();
                }
                client.dispatcher = client.connection?.play(ytdl(client.queue[0].url));
                client.queue[0].isPlaying = true;
                client.dispatcher?.on('finish', () => {
                    // set old song to not playing pop off array and call play func
                    client.queue[0].isPlaying = false;
                    client.queue.shift();
                    this.play(client, message);
                })
                this.playSuccess(message, client.queue[0].name, client);
            } 
        } else {
            client.user?.setActivity('commands | /help',{
                type: 'LISTENING'
            });
            console.log("Nothing in the queue to play");
        }
    }
    
    static async playSongByUrl(message: Message, args: string[], client: VariaClient): Promise<void> {
        if (this.defaultChecks(message, args)){
            // implement some url checking in future...
            const ytVideoID : string = args[0].substring(args[0].indexOf("v=") + 2);
            const ytVideoData: YTData = await YTFactory.getSongDataById(ytVideoID);
            client.queue.push(new QueueItem(ytVideoData.title, ytVideoData.url, ytVideoData.thumbnail, message.author.username, ytVideoData.duration, false));
            this.play(client, message);
        } else {
            console.error('Song check did not pass');
        }
    }

    static async playSongByKeywords(message: Message, args: string[], client: VariaClient){
        if (this.defaultChecks(message, args)){
            const commandArguments: string = args.join(' ');
            const ytVideoData : YTData = await YTFactory.getSongDataByName(commandArguments);
            client.queue.push(new QueueItem(ytVideoData.title, ytVideoData.url, ytVideoData.thumbnail, message.author.username, ytVideoData.duration, false));
            this.play(client, message);
        } else {
            console.error('Song check did not pass');
        }
    }

    static async playSuccess(message: Message, songTitle: string, client: VariaClient){
        const {author: {username}} = message;
        message.client.user?.setActivity(songTitle, {type: "LISTENING"});
        let messageEmbed = this.buildEmbed(message, songTitle, client);
        // let newMessage : Message;
        message.channel.send(messageEmbed).then((msg) => {
            msg.react('▶');
            msg.react('⏸️');
            msg.createReactionCollector(this.getReactionCollector(client), {time: 15000});
        });
        console.log(`${username} played ${songTitle}`);
    }

    static getReactionCollector(client: VariaClient): CollectorFilter {
        return (reaction: MessageReaction, user: User) => {
            if (!user.bot){
                if (reaction.emoji.toString() === '▶'){
                    client.dispatcher?.resume();
                } else if (reaction.emoji.toString() === '⏸️'){
                    client.dispatcher?.pause();
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
            { name: 'Duration', value: millisToMinutesAndSeconds(client.queue[0].duration), inline: true}
        )   
        .setTimestamp(new Date())
        .setThumbnail(client.queue[0].thumbnail)
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
        return true;
    }
}

export default MusicPlayer;