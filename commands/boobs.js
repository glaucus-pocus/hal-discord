const request = require('request');
const RichEmbed = require('discord.js').RichEmbed;
const Log = require('../utils/log.js');

exports.run = (client, message, args) => {
  if (!message.channel.nsfw) {
    return message.reply('Grossier personnage !').catch(console.error);
  }
  request('http://api.oboobs.ru/boobs/0/1/random', (err, resp, body) => {
      if (err) return Log.error(err);
      if (resp.statusCode === 200) {
        message.channel.send({embed: new RichEmbed()
          .setColor('DARK_RED')
          .setImage(`http://media.oboobs.ru/${JSON.parse(body)[0].preview}`)
        }).catch(console.error);
      }
  })
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['boobies'],
  permLevel: 2,
  nsfw: true
};

exports.help = {
  name: 'boobs',
  description: 'Writes some poem.',
  usage: 'boobs'
};