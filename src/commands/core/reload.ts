import { Message } from "discord.js";
import { VariaClient } from "../../typings/VariaClient";
const fs = require('fs');

module.exports = {
	name: 'reload',
	description: 'Reloads a command',
    args: true,
    usage: '/reload <command to reload>',
    aliases: ['r'],
    cooldown: 10,
	execute(message: Message, args: string[], client: VariaClient) {
        const fileExtension : string = process.env.NODE_ENV === "development" ? '.ts' : '.js';
        const commandName = args[0].toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find((cmd: any) => {
            return cmd.aliases && cmd.aliases.includes(commandName);
        });
        if (!command) {
            return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
        }
        const commandFolders = fs.readdirSync('./src/commands');
        const folderName = commandFolders.find((folder: string) => {
            return fs.readdirSync(`./src/commands/${folder}`).includes(`${commandName}${fileExtension}`);
        });
        delete require.cache[require.resolve(`../${folderName}/${commandName}${fileExtension}`)];
        try {
            const newCommand = require(`../${folderName}/${commandName}${fileExtension}`);
            client.commands.set(newCommand.name, newCommand);
        } catch (error) {
            console.error(error);
            message.channel.send(`There was an error while reloading a command \`${commandName}\`:\n\`${error.message}\``);
        }
        message.channel.send(`Command \`${commandName}\` was reloaded!`);
	}   
};