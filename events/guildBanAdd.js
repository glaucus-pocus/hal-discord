const settings = require('../settings.json');

exports.run = (client, member) => {
	if (member.guild.id !== settings.home) return;
	member.guild.defaultChannel.send(`${member} is now banned !`).then(message => message.react('😈'));

	const channel = member.guild.channels.find('name', settings.logs);
	if (!channel) return;
	channel.send(`banned member : ${member}`);
};