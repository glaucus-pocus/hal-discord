const settings = require('../../settings.json');

exports.run = async (client, message, args) => {
	if (args.length === 0) {
		if (message.member.voiceChannel) {
			try {
				message.member.voiceChannel.leave();
				return message.markAsDone();
			} catch (err) {
				console.error(err);
				return message.markAsError();
			}
		}
	} else {
		message.reply('I\'m not currently in a voice channel.');
		return message.markAsError();
	}
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
	name: 'leave',
	description: 'Makes me leave a voice channel.',
	usage: '',
	usageDelim: '',
};