/*
*  Module imports
*/
const {Client, Collection} = require("discord.js");
import dotenv from 'dotenv';
import config from './config.json';
const { readdirSync } =  require("fs");

const client : any = new Client();
client.commands = new Collection();
client.queue = new Map();
client.prefix = config.prefix
const commandFiles: string[] = readdirSync('./src/commands').filter( (file: string) => {
  if (file.endsWith('.ts') || file.endsWith('.js')){
    return file;
  }
});

// load and set environment variables
dotenv.config();
const DISCORD_TOKEN : (string | undefined) = process.env.DISCORD_TOKEN;

const setClientCommands = (commandFileList: string[]) => {
  for (const fileName of commandFileList) {
    const command = require(`./commands/${fileName}`);
    client.commands.set(command.name, command); 
  }
};

setClientCommands(commandFiles);

client.once('ready', () => {
  client.user.setPresence({
    status: "online",
    game: {
      name: "/help",
      type: "LISTENING"
    }
  });
	console.log('Varia is Running!');
});

// verbose debugging
// client.on('debug', console.log); 

client.on('message', async (message : any) => {
  // if message doesn't start with specified prefix or was sent by the bot then return immediately
  if (!message.content.startsWith(client.prefix) || message.author.bot) { return; }
  
  /*
  * removes the command prefix from message string
  * removes trailing whitespace 
  * splits arguments into array of strings
  */
  const args: string[] = message.content.slice(client.prefix.length).trim().split(/ +/);
  
  // takes first element in array and returns it but also removes the first element from the array
  const command: (string | undefined) = args.shift()?.toLowerCase();

  // if (!client.commmands.has(command)) return;
  
  try {
    client.commands.get(command).execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }

});

client.login(DISCORD_TOKEN); 