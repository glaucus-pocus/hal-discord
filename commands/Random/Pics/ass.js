exports.run = async (client, message) => {
  const request = require('request-promise-native');
  try {
    const body = await request.get('http://api.obutts.ru/butts/0/1/random').then(JSON.parse);
    message.channel.send({ embed: new client.methods.Embed()
      .setColor('DARK_RED')
      .setImage(`http://media.obutts.ru/${body[0].preview}`),
    });
  } catch (err) {
    client.functions.log(err, 'error');
  }
};

exports.conf = {
  nsfw: true,
  permLevel: 2,
  enabled: true,
  runIn: ['text'],
  aliases: ['butt'],
  botPerms: [],
};

exports.help = {
  name: 'ass',
  description: 'Writes some poem.',
  usage: '',
  usageDelim: '',
};
