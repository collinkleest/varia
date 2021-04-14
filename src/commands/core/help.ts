import { EmbedFieldData, Message, MessageEmbed } from "discord.js";
import { Command } from "../../typings/Command";
import { VariaClient } from "../../typings/VariaClient";

const commandsEmbed = (commandList: EmbedFieldData[]): MessageEmbed => {
    const msgEmbed = new MessageEmbed()
    .setColor('#1C2E4A')
    .setTitle('Commands List')
    .addFields(commandList)
    .setFooter('Use /help <specific command> for more details about a certain command', 'https://raw.githubusercontent.com/collinkleest/varia/master/assets/varialogo.png')
    .setTimestamp(new Date());
    return msgEmbed;
}

const singleCommandEmbed = (command: Command): MessageEmbed => {
    const msgEmbed = new MessageEmbed()
    .setColor('#1C2E4A')
    .setTitle(command.name)
    .setDescription(command.description)
    .addField('Usage:', command.usage)
    .addField('Aliases:', command.aliases.join(', '), true)
    .addField('Required Arguments:', command.args ? 'Yes' : 'No', true)
    .addField('Cooldown Time:', command.cooldown+" seconds", true)
    .setFooter('Varia Music Bot', 'https://raw.githubusercontent.com/collinkleest/varia/master/assets/varialogo.png')
    .setTimestamp(new Date());
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
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
            if (!command) {
                return message.reply('that\'s not a valid command!');
            }
            message.channel.send(singleCommandEmbed(command));
        }

	},
};