/*
*  Module imports
*/
const {Client, Collection} = require("discord.js");
import dotenv from 'dotenv';
import config from './config.json';
const { readdirSync } =  require("fs");

const client : any = new Client();
client.commands = new Collection();
client.queue = [];
client.prefix = config.prefix;
client.currentlyPlaying = "";

const commandFolders = readdirSync('./src/commands');

/*
* Read command files in directory `./src/commands`
* Set commands in client.commands collection 
*/
for (const folder of commandFolders){
  const commandFiles = readdirSync(`./src/commands/${folder}`).filter((file: string) => {
    if (file.endsWith('.ts') || file.endsWith('.js')){
      return file;
    }
  });
  commandFiles.forEach((file: any) => {
    const command = require(`./commands/${folder}/${file}`);
    console.log(`Loading command ${file}`);
    client.commands.set(command.name, command); 
  });
}



// load and set environment variables
dotenv.config();
const DISCORD_TOKEN : (string | undefined) = process.env.DISCORD_TOKEN;

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
  const commandName: (string | undefined) = args.shift()?.toLowerCase();
  // if command isn't present prevent execution
  if (!client.commands.has(commandName)) {return};

  const command = client.commands.get(commandName) || client.commands.find((cmd: any) => {
    cmd.aliases && cmd.aliases.includes(commandName)
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

  try {
    command.execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }

});

client.login(DISCORD_TOKEN); 