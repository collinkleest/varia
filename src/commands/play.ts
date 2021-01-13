import { Message } from "discord.js";
import { VariaClient } from "../typings/VariaClient";

const ytdl = require('ytdl-core');
const { getSongByName, getSongTitleById } = require('../utils/yt-factory'); 
const  {playSongFromKeywords, playSongByUrl} = require('../utils/yt-player'); 

module.exports = {
    name: 'play',
    description: 'Play a song with a given YouTube url < yt_uri : string>',
    async execute(message: Message, args: string[], client: VariaClient) {
        let commandArguments: string = args.join(' ');
        if (!(commandArguments.includes("youtube.com"))){
            playSongFromKeywords(message, args, client);
        } else {
            playSongByUrl(message, args, client);
        }
    }
  };