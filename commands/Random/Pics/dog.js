exports.run = async (client, message) => {
  const request = require('request-promise-native');
  try {
    const body = await request.get('https://random.dog/woof.json').then(JSON.parse);
    message.channel.send({ embed: new client.methods.Embed()
      .setColor('DARK_RED')
      .setImage(body.url),
    });
  } catch (err) {
    client.functions.log(err, 'error');
  }
};

exports.conf = {
  nsfw: false,
  permLevel: 2,
  enabled: true,
  runIn: ['text'],
  aliases: ['bitch', 'woof'],
  botPerms: [],
};

exports.help = {
  name: 'dog',
  description: 'Woof.',
  usage: '',
  usageDelim: '',
};
