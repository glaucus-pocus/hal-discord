const settings = require('../settings.json');

exports.run = (client, message, args) => {
  const messageCount = parseInt(args) || 50;
  const logs = message.guild.channels.find('name', settings.logs);
  const channel = message.channel;
  channel.fetchMessages({ limit: messageCount }).then(messages => messages.deleteAll());
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['clear'],
  permLevel: 5,
  nsfw: false
};

exports.help = {
  name: 'purge',
  description: 'Purges a channel',
  usage: 'purge <message count>'
};