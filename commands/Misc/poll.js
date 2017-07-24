exports.run = async (client, message) => {
	message.send('In development');
};

exports.conf = {
	runIn: ['text'],
	enabled: true,
	aliases: [],
	permLevel: 2,
	botPerms: [],
	nsfw: false
};

exports.help = {
	name: 'poll',
	description: 'Creates a poll',
	usage: '',
	usageDelim: '',
};