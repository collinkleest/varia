import Discord from 'discord.js';
import dotenv from 'dotenv';
const client = new Discord.Client();

// load in environment variables
dotenv.config();

client.on('ready', () => {
	console.log('Varia is Running!');
});

client.login(process.env.DISCORD_TOKEN); 