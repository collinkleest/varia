import Discord from 'discord.js';
import dotenv from 'dotenv';
import config from './config.json';
import fs from 'fs';

const client : any = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles: string[] = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'));

// load and set environment variables
dotenv.config();
const DISCORD_TOKEN : (string | undefined) = process.env.DISCORD_TOKEN;
const COMMAND_PREFIX : string = config.prefix;

const setClientCommands = (commandFileList: string[]) => {
  for (const fileName of commandFileList) {
    const command = require(`./commands/${fileName}`);
    client.commands.set(command.name, command); 
  }
};


client.once('ready', () => {
	console.log('Varia is Running!');
});

client.on('message', (message : any) => {
  // if message doesn't start with specified prefix or was sent by the bot then return immedietely
  if (!message.content.startsWith(COMMAND_PREFIX) || message.author.bot) { return; }
  
  /*
  * removes the command prefix from message string
  * removes trailing whitespace 
  * splits argumemts into array of strings
  */
  const args: string[] = message.content.slice(COMMAND_PREFIX.length).trim().split(/ +/);
  
  // takes first element in array and returns it but also removes the first element from the array
  const command: (string | undefined) = args.shift()?.toLowerCase();

	if (message.content.startsWith(`${COMMAND_PREFIX}play`)) { 
		console.log('User wants to play a song!');
	}
});

client.login(DISCORD_TOKEN); 