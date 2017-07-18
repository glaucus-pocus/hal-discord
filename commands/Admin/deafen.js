exports.run = (client, message, args) => {
	if (message.mentions.users.size === 0 && message.mentions.roles.size === 0) {
		return message.reply('T\'as pas dit qui qu\'tu veux deafen').catch(console.error);
	}
	if (!message.guild.member(client.user).hasPermission('DEAFEN_MEMBERS')) {
		return message.reply('Je peux pas.').catch(console.error);
	}

	const deafenMember = (member) => {
		if (!member || !member.voiceChannel) return;
		if (member.serverDeaf) return message.channel.send(`${member} est déjà deaf`);
		member.setDeaf(true).catch(console.error);
	};

	message.mentions.users.forEach(user => deafenMember(message.guild.member(user)));
	message.mentions.roles.forEach(role => role.members.forEach(member => deafenMember(member)));
};

exports.conf = {
	runIn: ['text'],
	enabled: true,
	aliases: ['+d'],
	permLevel: 5,
	botPerms: [],
	nsfw: false
};

exports.help = {
	name: 'deafen',
	description: 'Deafens a member or a group',
	usage: '<members|roles>',
	usageDelim: '',
};