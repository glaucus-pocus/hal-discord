const request = require('request');
const RichEmbed = require('discord.js').RichEmbed;
const Log = require('../utils/log.js');

exports.run = (client, message, args) => {
  request('https://random.dog/woof.json', (err, resp, body) => {
      if (err) return Log.error(err);
      if (resp.statusCode === 200) {
        message.channel.send({embed: new RichEmbed()
          .setColor('DARK_RED')
          .setImage(JSON.parse(body).url)
        }).catch(console.error);
      }
  })
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['bitch', 'woof'],
  permLevel: 2,
  nsfw: false
};

exports.help = {
  name: 'dog',
  description: 'Woof.',
  usage: 'dog'
};