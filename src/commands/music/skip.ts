import {Message} from "discord.js";
import { VariaClient } from "../../typings/VariaClient";
import MusicPlayer from "../../core/MusicPlayer";

module.exports = {
    name: "skip",
    description: "Skip song that is currently playing",
    args: false,
    usage: '/skip <song name> or <song url> or <queue position>',
    aliases: ['s'],
    async execute(message: Message, args: string[], client: VariaClient){
        // check if there are items in queue
        if (client.queue.length > 0 ) {
            // remove currently playing song and play next song
            client.queue.shift();
            MusicPlayer.play(client, message);
        }
    } 
}