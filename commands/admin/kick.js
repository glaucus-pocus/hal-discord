exports.run = (client, message, args) => {
  if (message.mentions.users.size === 0) {
    return message.reply('T\'as pas dit qui qu\'tu veux kick').catch(console.error);
  }
  const kickMember = message.guild.member(message.mentions.users.first());
  if (!kickMember) {
    return message.reply('Hum, c\'est qui ? Connais pas.');
  }
  if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) {
    return message.reply('Je peux pas.').catch(console.error);
  }
  kickMember.kick().then(member => {
    message.reply(`${member.user.username} a dégagé.`).catch(console.error);
  }).catch(console.error)
}