const fs = require('fs');
const settings = require('../../settings.json');

exports.run = (client, message, args) => {
	if (!args) {
		if (message.member.voiceChannel) {
			message.member.voiceChannel.join()
                .then((connection) => {
	                console.log(client.voiceConnections);
	const dispatcher = connection.playFile('/home/bots/NoobEater/sounds/bisounours.mp3');
	dispatcher.setVolume(.5);
	console.log(dispatcher.time);

	return message.markAsDone();
}).catch(console.error);
		}
	} else {
		message.reply('you need to be in a voice channel to use this command.');
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
	name: 'join',
	description: 'Makes me join you in a voice channel.',
	usage: '',
	usageDelim: '',
};