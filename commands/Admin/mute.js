exports.run = async (client, message, [member_or_role]) => {
	let muteRole = message.guild.roles.find(r => r.name.toLowerCase() === 'muted');
	if (!muteRole) return message.reply('I cannot find a `Muted` role!');

	let members = new client.methods.Collection();

	if (member_or_role.constructor.name === 'Role') {
		members = member_or_role.members;
	} else {
		members.set(member_or_role.id, member_or_role);
	}

	return Promise.all(members.map(m => m.addRole(muteRole)));
};

exports.conf = {
	runIn: ['text'],
	enabled: true,
	aliases: ['+m'],
	permLevel: 5,
	botPerms: ['MANAGE_ROLES'],
	nsfw: false
};

exports.help = {
	name: 'mute',
	description: 'Mutes a member or a group',
	usage: '<member:member|role:role>',
	usageDelim: '',
};