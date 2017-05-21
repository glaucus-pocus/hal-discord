const settings = require('../../settings.json');

exports.run = (client, message, args) => {
  message.channel.fetchMessages()
                .then(messages => message.channel.bulkDelete(messages))
                .catch(error => {
                    const channel = message.guild.channels.find('name', settings.logs);
                    if (!channel) return;
                    channel.send(`Error while purging ${message.channel} : \`${error}\``);
                });
}