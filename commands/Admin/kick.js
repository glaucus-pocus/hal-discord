exports.run = async (client, message, [member]) => member.kick().then(() => message.markAsDone());

exports.conf = {
  runIn: ['text'],
  enabled: true,
  aliases: [],
  permLevel: 5,
  botPerms: ['KICK_MEMBERS'],
  nsfw: false,
};

exports.help = {
  name: 'kick',
  description: 'Kicks a member',
  usage: '<member:member>',
  usageDelim: '',
};
