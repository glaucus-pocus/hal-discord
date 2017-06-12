exports.run = (client, message, args) => {
  if (message.mentions.users.size === 0 && message.mentions.roles.size === 0) {
    return message.reply('T\'as pas dit qui qu\'tu veux undeafen').catch(console.error);
  }
  if (!message.guild.member(client.user).hasPermission('DEAFEN_MEMBERS')) {
    return message.reply('Je peux pas.').catch(console.error);
  }

  const undeafenMember = (member) => {
      if (!member || !member.voiceChannel) return;
      if (!member.serverDeaf) return message.channel.send(`${member} n'est pas deaf`);
      member.setDeaf(false).catch(console.error);
  };

  message.mentions.users.forEach(user => { undeafenMember(message.guild.member(user)); });
  message.mentions.roles.forEach(role => { role.members.forEach(member => { undeafenMember(member); }); });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['-d'],
  permLevel: 5,
  nsfw: false
};

exports.help = {
  name: 'undeafen',
  description: 'Undeafens a member or a group',
  usage: 'undeafen <members> <roles>'
};