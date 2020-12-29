module.exports = {
    name: 'pause',
    description: 'Pause a song that is currently playing',
    async execute(message: any, args: string[], client:any) {
        if (client.dispatcher){
            if (client.dispatcher.paused){
              message.reply(`Song is already paused`);
            }
            client.dispatcher.pause();
            message.channel.send(`<@${message.author.id}>, paused music!`);
            return;
          } else {
            message.channel.send(`Varia is not currently playing music!`);
            return;
        }
    }
  };