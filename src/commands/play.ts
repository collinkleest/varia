import { Message } from "discord.js";
import { VariaClient } from "../typings/VariaClient";

const ytdl = require('ytdl-core');
const { getSongByName } = require('../utils/yt-factory'); 
module.exports = {
    name: 'play',
    description: 'Play a song with a given YouTube url < yt_uri : string>',
    async execute(message: Message, args: string[], client: VariaClient) {
        if (message.member == null){return;}
        if (args.length == 0){
            message.reply('pass a song name or YouTube url');
            return;
        }
        let commandArguments: string = args.join(' ');
        let userId: string = message.author.id;
        let userName: string = message.author.username;
        if (!(commandArguments.includes("youtube.com"))){
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
                        client.dispatcher.on('speaking', (isSpeaking: boolean) => {
                            if (!isSpeaking){
                                console.log('Song finished!');
                            }
                        })
                        message.channel.send(`<@${userId}> played ${ytData[0]}!`);
                        console.log(`${userName} played ${ytData[0]}`);
                    } else {
                        message.channel.send(`<@${userId}>, you must join a voice channel to play music!`);
                        console.log(`${userName} tried to play music when not in a voice channel`);
                    }
                }
            }
        }
    }
  };