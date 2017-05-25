const request = require('request');
const RichEmbed = require('discord.js').RichEmbed;
const Log = require('../utils/log.js');

exports.run = (client, message, args) => {
  request('http://random.cat/meow', (err, resp, body) => {
      if (err) return Log.error(err);
      if (resp.statusCode === 200) {
        message.channel.send({embed: new RichEmbed()
          .setColor('DARK_RED')
          .setImage(JSON.parse(body).file)
        }).catch(console.error);
      }
  })
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['pussy'],
  permLevel: 2,
  nsfw: false
};

exports.help = {
  name: 'cat',
  description: 'Moew.',
  usage: 'cat'
};