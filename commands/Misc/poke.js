exports.run = async (client, message, [roleOrMember]) => {
  let members;
  if (roleOrMember.constructor.name === 'Role') {
    members = roleOrMember.members;
  } else {
    members = new client.methods.Collection();
    members.set(roleOrMember.id, roleOrMember);
  }

  return Promise.all(members.map(m => m.user.send(`You were poked by ${message.author}.`)));
};

exports.conf = {
  runIn: ['text'],
  enabled: true,
  aliases: [],
  permLevel: 2,
  botPerms: [],
  nsfw: false,
  cooldown: 5,
};

exports.help = {
  name: 'poke',
  description: 'Pokes a roll or a member',
  usage: '<role:role|member:member>',
  usageDelim: '',
};
