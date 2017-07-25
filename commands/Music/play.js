const fs = require('fs');
const YoutubeStream = require('ytdl-core');
const settings = require('../../settings.json');

exports.run = async (client, message, [url]) => {
	if (message.member.voiceChannel) {
		message.member.voiceChannel.join()
            .then((connection) => {
	            console.log(client.voiceConnections);
                //const stream = fs.createReadStream('../sounds/beep.wav');
	let dispatcher;
	if(!url) {
		dispatcher = connection.playFile('/home/bots/NoobEater/sounds/bisounours.mp3');
	} else {
		let stream = YoutubeStream(url);
		stream.on('error', () => {
			message.reply('cannot find');
			message.markAsError();
			connection.disconnect();
		});
		dispatcher = connection.playStream(stream);
	}
	dispatcher.setVolume(.5);

	return message.markAsDone();
}).catch(console.error);
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
	name: 'play',
	description: '♫',
	usage: '[url:url]',
	usageDelim: '',
};