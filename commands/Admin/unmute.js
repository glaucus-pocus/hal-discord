exports.run = async (client, message, [memberOrRole]) => {
  const muteRole = message.guild.roles.find(r => r.name.toLowerCase() === 'muted');
  if (!muteRole) return message.reply('I cannot find a `Muted` role!');

  let members = new client.methods.Collection();

  if (memberOrRole.constructor.name === 'Role') {
    members = memberOrRole.members;
  } else {
    members.set(memberOrRole.id, memberOrRole);
  }

  return Promise.all(members.map(m => m.removeRole(muteRole)));
};

exports.conf = {
  runIn: ['text'],
  enabled: true,
  aliases: ['-m'],
  permLevel: 5,
  botPerms: [],
  nsfw: false,
};

exports.help = {
  name: 'unmute',
  description: 'Unmutes a member or a group',
  usage: '<member:member|role:role>',
  usageDelim: '',
};
