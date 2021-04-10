import { Message } from "discord.js";
import { VariaClient } from "../../typings/VariaClient";
import MusicPlayer from "../../core/MusicPlayer";

module.exports = {
    name: 'play',
    description: 'Play a song with a given YouTube url < yt_uri : string>',
    args: true,
    usage: '/play <youtube url or song name>',
    aliases: ['p'],
    async execute(message: Message, args: string[], client: VariaClient) {
        let commandArguments: string = args.join(' ');
        if (!(commandArguments.includes("youtube.com"))){
            MusicPlayer.playSongByKeywords(message, args, client);
        } else {
            MusicPlayer.playSongByUrl(message, args, client);
        }
    }
  };