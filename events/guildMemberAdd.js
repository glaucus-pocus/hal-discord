const settings = require('../settings.json');

exports.run = (client, member) => {
	member.guild.defaultChannel.send(`${member} nous a rejoint !`).then((message) => {
		message.react('😊');
	});

	const channel = member.guild.channels.find('name', settings.logs);
	if (!channel) return;
	channel.send(`added member : ${member}`);
};