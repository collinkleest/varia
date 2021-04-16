import {Message} from "discord.js";
import { VariaClient } from "../../typings/VariaClient";
import MusicPlayer from "../../core/MusicPlayer";

module.exports = {
    name: "skip",
    description: "Skip song that is currently playing",
    args: false,
    usage: '/skip <song name> or <song url> or <queue position>',
    aliases: ['s'],
    cooldown: 5,
    async execute(message: Message, args: string[], client: VariaClient){
        const queue = client.queue.get(message.guild.id);
        // check if there are items in queue
        if (queue.items.length) {
            // remove currently playing song and play next song
            queue.items.shift();
            MusicPlayer.play(client, message);
        }
    } 
}