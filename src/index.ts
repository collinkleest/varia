/*
*  Module imports
*/
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {Client, Collection} = require("discord.js");
import dotenv from 'dotenv';
import config from './data/config.json';
import { Queue } from './typings/Queue';
import { VariaClient } from './typings/VariaClient';
import express from 'express';
import { readdirSync, writeFileSync } from "fs";

// load and set environment variables
dotenv.config();
const DISCORD_TOKEN : (string | undefined) = process.env.DISCORD_TOKEN;
const SERVER_PORT : number =  process.env.NODE_ENV === "development" ?  3000 : parseInt(process.env.PORT);

// get source dir for production or development build
const sourceDir : string = process.env.NODE_ENV === "development" ? "./src" : "./dist"; 

// run basic http server for homepage
const expressApp = express();
expressApp.use(express.static('./frontend/dist/'));
expressApp.listen(SERVER_PORT);

const client : VariaClient = new Client();
client.commands = new Collection();
client.prefix = config.prefix;
client.queue = new Map(); 
client.currentlyPlaying = "";
client.cooldowns = new Collection();


// get command folders
const commandFolders = readdirSync(`${sourceDir}/commands`);
const commandsJson : any = {
  catagories: []
};
/*
* Read command files in directory `./src/commands`
* Set commands in client.commands collection 
*/
for (const folder of commandFolders){
  const catagoryJson : any = {
    name: folder,
    commands: [] 
  };
  const commandFiles = readdirSync(`${sourceDir}/commands/${folder}`).filter((file: string) => {
    if (file.endsWith('.ts') || file.endsWith('.js')){
      return file;
    }
  });
  commandFiles.forEach((file: any) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(`./commands/${folder}/${file}`);
    console.log(`Loading command ${file}`);
    client.commands.set(command.name, command);

    const commandData = {
      name: command.name,
      description: command.description,
      aliases: command.aliases,
      usage: command.usage,
      args: command.args,
      cooldown: command.cooldown,
    };
    catagoryJson.commands.push(commandData);
  });
  commandsJson.catagories.push(catagoryJson);
}
writeFileSync(`${sourceDir}/data/commands.json`, JSON.stringify(commandsJson, null, 2));



client.once('ready', () => {
  client.user?.setActivity('commands | /help',{
    type: 'LISTENING'
  });
  
  client.guilds.cache.forEach((guild) => {
    client.queue.set(guild.id, new Queue());
  });
  
	console.log('Varia is Running!');
});
client.on('warn', (warning) => {console.log(warning);});
client.on('error', (error) => {console.error(error);});

// verbose debugging
// client.on('debug', (debug) => {console.log(debug);});

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
  const commandName = String(args.shift()?.toLowerCase());

  const command = client.commands.get(commandName) || client.commands.find((cmd: any) => {
    return cmd.aliases && cmd.aliases.includes(commandName);
  });

  if (!command){return;}
  
  // check if args are required
  if (command.args && !args.length){
    let reply = `You didn't provide any arguments, ${message.author}!`;
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${command.usage}\``;
    }
    return message.channel.send(reply);
  }

  const { cooldowns } = client;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps?.has(message.author.id)) {
    const timestamp = timestamps.get(message.author.id);
    if (timestamp){
      const expirationTime =  timestamp + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
      }
    }
  }
  timestamps?.set(message.author.id, now);
  setTimeout(() => timestamps?.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }

});

client.login(DISCORD_TOKEN); 