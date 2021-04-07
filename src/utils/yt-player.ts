import { Client, Message } from "discord.js";
import { VariaClient } from "../typings/VariaClient";
import { getSongByName, getSongTitleById } from "./yt-factory";

const ytdl = require('ytdl-core');

const play = (client: VariaClient) => {
    if (client.queue.length > 0){
        client.dispatcher = client.connection.play(ytdl(client.queue[0].url));
        client.queue[0].isPlaying = true;
        client.currentlyPlaying = client.queue[0].name;
        
        client.dispatcher.on('finish', () => {
            console.log('song has finished');
            client.queue[0].isPlaying = false;
            client.queue.shift();
            play(client);
        });
    } else {
        console.log('there is nothing to play');
    }
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

    if (client.connection && client.connection.speaking){
        client.queue.push({ name: ytData[0], url: ytData[1], isPlaying: false});
        message.channel.send(`<@${userId}> added ${ytData[0]} to the queue!`);
        console.log(`${userName} added ${ytData[0]} to the queue!`);
    } else {
        client.queue.push({ name: ytData[0], url: ytData[1], isPlaying: false});
        if (!client.connection){
            if (message.member.voice.channel){
                client.connection = await message.member.voice.channel.join();
                // client.dispatcher = client.connection.play(ytdl(ytData[1]));
                play(client);
                
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

    client.queue.push({name: ytVideoTitle, url: args[0], isPlaying: false});
    if (!client.connection) {
        if (message.member.voice.channel){
            client.connection = await message.member.voice.channel.join();
            client.dispatcher = client.connection.play(ytdl(args[0]));
            client.currentlyPlaying = ytVideoTitle;

            message.channel.send(`<@${userId}> played ${ytVideoTitle}!`);
            console.log(`${userName} played ${ytVideoTitle}`);
        } else {
            message.channel.send(`<@${userId}>, you must join a voice channel to play music!`);
            console.log(`${userName} tried to play music when not in a voice channel`);
        }  
    }
}

export {playSongFromKeywords, playSongByUrl};