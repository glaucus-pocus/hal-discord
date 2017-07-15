const settings = require('../settings.json');
const Emoji = require('discord-emoji');

exports.run = (client, member) => {
	member.guild.defaultChannel.send(`${member} n'est plus banni !`).then((message) => {
		message.react(Emoji.people.innocent);
	});

	const channel = member.guild.channels.find('name', settings.logs);
	if (!channel) return;
	channel.send(`unbanned member : ${member}`);
};