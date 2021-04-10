import { Message } from "discord.js";
import { VariaClient } from "../typings/VariaClient";
import { YTData } from "../typings/YTData";
import YTFactory from "./YTFactory";
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
                this.playSuccess(message, client.queue[0].name);
            } 
        } else {
            console.error("Nothing in the queue to play");
        }
    }
    
    static async playSongByUrl(message: Message, args: string[], client: VariaClient): Promise<void> {
        if (this.defaultChecks(message, args)){
            // implement some url checking in future...
            const ytVideoID : string = args[0].substring(args[0].indexOf("v=") + 2);
            const ytVideoData: YTData = await YTFactory.getSongDataById(ytVideoID);
            client.queue.push({name: ytVideoData.title, url: ytVideoData.url, isPlaying: false});
            this.play(client, message);
        } else {
            console.error('Song check did not pass');
        }
    }

    static async playSongByKeywords(message: Message, args: string[], client: VariaClient){
        if (this.defaultChecks(message, args)){
            const commandArguments: string = args.join(' ');
            const ytVideoData : YTData = await YTFactory.getSongDataByName(commandArguments);
            client.queue.push({name: ytVideoData.title, url: ytVideoData.url, isPlaying: false});
            this.play(client, message);
        } else {
            console.error('Song check did not pass');
        }
    }

    static async playSuccess(message: Message, songTitle: string){
        const {author: {username}} = message;
        message.channel.send(`${songTitle} is now playing!`);
        console.log(`${username} played ${songTitle}`);
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