exports.run = (client, message, args) => {
	if (message.mentions.users.size === 0 && message.mentions.roles.size === 0) {
		return message.reply('t\'as pas dit qui qu\'tu veux unmute').catch(console.error);
	}
	if (!message.guild.member(client.user).hasPermission('MUTE_MEMBERS')) {
		return message.reply('je peux pas.').catch(console.error);
	}

	const unmuteMember = (member) => {
		if (!member || !member.voiceChannel) return;
		if (!member.serverMute) return message.channel.send(`${member} n'est pas mute`);
		member.setMute(false).catch(console.error);
	};

	message.mentions.users.forEach(user => unmuteMember(message.guild.member(user)));
	message.mentions.roles.forEach(role => role.members.forEach(member => unmuteMember(member)));
};

exports.conf = {
	runIn: ['text'],
	enabled: true,
	aliases: ['-m'],
	permLevel: 5,
	botPerms: [],
	nsfw: false
};

exports.help = {
	name: 'unmute',
	description: 'Unmutes a member or a group',
	usage: '<members|roles>',
	usageDelim: '',
};