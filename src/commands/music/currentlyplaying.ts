import { Message, MessageEmbed } from "discord.js";
import { Queue } from "../../typings/Queue";
import { VariaClient } from "../../typings/VariaClient";
import { playtimeToString } from "../../utils/timeutils";

const cpEmbed = (client: VariaClient, message: Message): MessageEmbed => {
    const queue = client.queue.get(message.guild.id);
    const {name, url, duration, playedBy, thumbnail} = queue.items[0];
    const msgEmbed = new MessageEmbed()
    .setTitle(name)
    .setColor('#1C2E4A')
    .setDescription(url)
    .setThumbnail(thumbnail)
    .addField("Playtime:", playtimeToString(queue.dispatcher?.streamTime, duration), true)
    .addField("Played By:", playedBy, true)
    .addField("Status:", "✅", true);
    return msgEmbed;
}

module.exports = {
	name: 'currentlyplaying',
	description: 'Display the currently playing song.',
	aliases: ['playing', 'cp', 'playingnow'],
	usage: '/currentlyplating',
    args: false,
	cooldown: 5,
	execute(message: Message, args: string[], client: VariaClient) {
        message.channel.send(cpEmbed(client, message));
	},
};