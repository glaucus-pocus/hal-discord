exports.run = async (client, message, [role]) => message.send(`List of ${role.name} members: ${role.members.map(m => m.displayName).join(', ')}`);

exports.conf = {
  runIn: ['text'],
  enabled: true,
  aliases: [],
  permLevel: 0,
  botPerms: [],
  nsfw: false,
  cooldown: 5,
};

exports.help = {
  name: 'whoisin',
  description: 'Enumerates the members having the role.',
  usage: '<role:role>',
  usageDelim: '',
};
