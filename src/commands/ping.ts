module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(message: any, args: string[]) {
    message.channel.send('Pong.');
  }
};