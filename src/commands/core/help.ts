import { EmbedFieldData, Message, MessageEmbed } from "discord.js";
import { VariaClient } from "../../typings/VariaClient";

const commandsEmbed = (commandList: EmbedFieldData[]): MessageEmbed => {
    let msgEmbed = new MessageEmbed()
    .setColor('#1C2E4A')
    .setTitle('Commands List')
    .addFields(commandList)
    .setFooter('Use /help <specific command> for more details about a certain command', '../../../assets/varialogo.png');
    return msgEmbed;
}

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '/help <command name>',
    args: false,
	cooldown: 5,
	execute(message: Message, args: string[], client: VariaClient) {
		const data : EmbedFieldData[] = [];
        const { commands } = client;
        if (!args.length) {
            commands.forEach((cmd) => {
                let embedField = {name: '', value: '', inline: true};
                embedField.name = cmd.name;
                embedField.value = cmd.description;
                data.push(embedField);
            })
            message.channel.send(commandsEmbed(data));
        } else {

        }

	},
};