import { Message, MessageEmbed } from "discord.js";
import { VariaClient } from "../../typings/VariaClient";
import MusicPlayer from "../../core/MusicPlayer";
import YTFactory from "../../core/YTFactory";

module.exports = {
    name: 'search',
    description: 'Search YouTube for a song',
    args: true,
    usage: '/search <song name>',
    aliases: ['find', 'query'],
    cooldown: 5,
    async execute(message: Message, args: string[], client: VariaClient) {
        const commandArguments: string = args.join(' ');
        const searchResultsResponse = await YTFactory.getSongsBySearchQuery(commandArguments);
        let searchResults = '';
        searchResultsResponse.data.items.forEach((item, index) => {
            searchResults += `${index+1}: ${item.snippet.title}\n`;
        });


        const songEmbed = new MessageEmbed()
        .setColor('#1C2E4A')
        .setTitle(`Youtube search results for ${commandArguments}`)
        .setDescription(searchResults)   
        .setTimestamp(new Date())
        .setFooter('Varia Music Bot', 'https://raw.githubusercontent.com/collinkleest/varia/master/assets/varialogo.png');
        message.channel.send(songEmbed);
    }
  };