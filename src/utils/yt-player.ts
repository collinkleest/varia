import { Message } from "discord.js";
import { VariaClient } from "../typings/VariaClient";
import { getSongByName, getSongTitleById } from "./yt-factory";

const ytdl = require('ytdl-core');

const play = (client: VariaClient, songUri: string) => {
    if (!songUri){
        client.connection.disconnect();
        return;
    }

    const dispatcher = client.connection
        .play(ytdl(songUri))
        .on('finish', () => {
            client.queue.delete(client.currentlyPlaying);
            let nextSongUrl : string = client.queue.values().next().value;
            play(client, nextSongUrl);
        });
}

const playSongFromKeywords = async (message: Message, args: string[], client: VariaClient) => {
    if (message.member === null){return;}
    if (args.length === 0){
        message.reply('/play <song name> / <YouTube URL>');
        return;
    }
    
    let commandArguments: string = args.join(' ');
    let userId: string = message.author.id;
    let userName: string = message.author.username;
    let ytData : string[] = await getSongByName(commandArguments);

    if (client.dispatcher){
        client.queue.set(ytData[0], ytData[1]);
        message.channel.send(`<@${userId}> added ${ytData[0]} to the queue!`);
        console.log(`${userName} added ${ytData[0]} to the queue!`);
    } else {
        client.queue.set(ytData[0], ytData[1]);
        if (!client.connection){
            if (message.member.voice.channel){
                client.connection = await message.member.voice.channel.join();
                client.dispatcher = client.connection.play(ytdl(ytData[1]));
                client.currentlyPlaying = ytData[0];

                client.dispatcher.on('finish', async () => {
                    client.queue.delete(client.currentlyPlaying);
                    if (client.queue.size > 0){
                        let nextSongUrl : string = client.queue.values().next().value;
                        let nextSongName : string = client.queue.keys().next().value;
                        console.log(nextSongUrl);
                        console.log(nextSongName);
                        client.currentlyPlaying = nextSongUrl;
                        client.connection.disconnect();
                        client.dispatcher = client.connection.play(ytdl(nextSongName));
                        message.channel.send(`Playing next song in queue, ${nextSongName}`);
                        console.log(`Playing next song in queue, ${nextSongName}`);
                    }
                });
                
                message.channel.send(`<@${userId}> played ${ytData[0]}!`);
                console.log(`${userName} played ${ytData[0]}`);
            } else {
                message.channel.send(`<@${userId}>, you must join a voice channel to play music!`);
                console.log(`${userName} tried to play music when not in a voice channel`);
            }
        }
    }
}

const playSongByUrl = async (message: Message, args: string[], client: VariaClient) => {
    if (message.member === null){return;}
    if (args.length === 0){
        message.reply('/play <song name> / <YouTube URL>');
        return;
    }
    
    let userId: string = message.author.id;
    let userName: string = message.author.username;
    let ytVideoUri : string = args[0];
    let ytVideoId : string = ytVideoUri.substring(ytVideoUri.indexOf("v=") + 2);
    let ytVideoTitle = await getSongTitleById(ytVideoId);

    client.queue.set(ytVideoTitle, args[0]);
    if (!client.connection) {
        if (message.member.voice.channel){
            client.connection = await message.member.voice.channel.join();
            client.dispatcher = client.connection.play(ytdl(args[0]));
            client.currentlyPlaying = ytVideoTitle;

            client.dispatcher.on('finish', async () => {
                client.queue.delete(client.currentlyPlaying);
                if (client.queue.size > 0){
                    let nextSongUrl : string = client.queue.values().next().value;
                    let nextSongName : string = client.queue.keys().next().value;
                    console.log(nextSongUrl);
                    console.log(nextSongName);
                    client.currentlyPlaying = nextSongUrl;
                    client.dispatcher = client.connection.play(ytdl(nextSongName));
                    message.channel.send(`Playing next song in queue, ${nextSongName}`);
                    console.log(`Playing next song in queue, ${nextSongName}`);
                }
            });

            message.channel.send(`<@${userId}> played ${ytVideoTitle}!`);
            console.log(`${userName} played ${ytVideoTitle}`);
        } else {
            message.channel.send(`<@${userId}>, you must join a voice channel to play music!`);
            console.log(`${userName} tried to play music when not in a voice channel`);
        }  
    }
}

export {playSongFromKeywords, playSongByUrl};