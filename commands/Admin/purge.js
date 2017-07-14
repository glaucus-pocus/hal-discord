const settings = require('../../settings.json');

exports.run = (client, message, args) => {
	const messageCount = parseInt(args[0]) || 50;
	const logs = message.guild.channels.find('name', settings.logs);
	const channel = message.channel;
	return channel.fetchMessages({ limit: messageCount }).then(messages => messages.deleteAll());
};

exports.conf = {
	runIn: ['text'],
	enabled: false,
	aliases: ['clear'],
	permLevel: 5,
	botPerms: [],
	nsfw: false
};

exports.help = {
	name: 'purge',
	description: 'Purges a channel',
	usage: '[count]',
	usageDelim: '',
};