exports.run = async (client, message, args) => {
	const request = require('request-promise-native');
	try {
		const body = await request.get('http://api.oboobs.ru/boobs/0/1/random').then(JSON.parse);
		message.channel.send({embed: new client.methods.Embed()
				.setColor('DARK_RED')
				.setImage(`http://media.oboobs.ru/${body[0].preview}`)
		});
	} catch(err) {
		client.functions.log(err, 'error');
	}
};

exports.conf = {
	nsfw: true,
	permLevel: 2,
	enabled: true,
	runIn: ['text'],
	aliases: ['boobies'],
	botPerms: [],
};

exports.help = {
	name: 'boobs',
	description: 'Writes some poem.',
	usage: '',
	usageDelim: '',
};