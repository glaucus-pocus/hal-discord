exports.run = (client, message, args) => {
  if (message.mentions.users.size === 0 && message.mentions.roles.size === 0) {
    return message.reply('t\'as pas dit qui qu\'tu veux mute').catch(console.error);
  }
  if (!message.guild.member(client.user).hasPermission('MUTE_MEMBERS')) {
    return message.reply('je peux pas.').catch(console.error);
  }

  const muteMember = (member) => {
      if (!member || !member.voiceChannel) return;
      if (member.serverMute) return message.channel.send(`${member} est déjà mute`);
      member.setMute(true).catch(console.error);
  };

  message.mentions.users.forEach(user => { muteMember(message.guild.member(user)); });
  message.mentions.roles.forEach(role => { role.members.forEach(member => { muteMember(member); }); });
}