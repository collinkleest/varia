import { Message, MessageEmbed } from "discord.js";
import { VariaClient } from "../../typings/VariaClient";
import { millisToMinutesAndSeconds } from "../../utils/timeutils";

const cpEmbed = (client: VariaClient): MessageEmbed => {
    const {name, url, duration, playedBy} = client.queue[0];
    const msgEmbed = new MessageEmbed()
    .setTitle(name)
    .setColor('#1C2E4A')
    .setDescription(url)
    .addField("Playtime:", '['+ millisToMinutesAndSeconds(client.dispatcher?.streamTime) + " | " + millisToMinutesAndSeconds(duration)+"]", true)
    .addField("Played By:", playedBy, true);
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
        message.channel.send(cpEmbed(client));
	},
};