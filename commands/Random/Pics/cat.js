exports.run = async (client, message, args) => {
	const request = require('request-promise-native');
	try {
		const body = await request.get('http://random.cat/meow').then(JSON.parse);
		message.channel.send({embed: new client.methods.Embed()
				.setColor('DARK_RED')
				.setImage(body.file)
		});
	} catch(err) {
		client.functions.log(err, 'error');
	}
};

exports.conf = {
	nsfw: false,
	permLevel: 2,
	enabled: true,
	runIn: ['text'],
	aliases: ['pussy', 'moew'],
	botPerms: [],
};

exports.help = {
	name: 'cat',
	description: 'Moew.',
	usage: '',
	usageDelim: '',
};