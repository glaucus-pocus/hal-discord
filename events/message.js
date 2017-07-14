//const sql = require('sqlite');
const Emoji = require('discord-emoji');
const settings = require('../settings.json');

//sql.open('../db.sqlite');

const updateUserXP = (points, userId) => {
	sql.get(`SELECT xp, level FROM users WHERE id = '${userId}'`).then((row) => {
		if (!row) {
			sql.run('INSERT INTO users (id, xp, level) VALUES (?, ?, ?)', [userId, 1, 0]);
		} else {
			sql.run(`UPDATE users SET xp = ${row.xp + points} WHERE id = ${userId}`);
		}
	}).catch(() => {
		console.error;
		sql.run('CREATE TABLE IF NOT EXISTS users (id TEXT, xp INTEGER, level INTEGER)').then(() => {
			sql.run('INSERT INTO users (id, xp, level) VALUES (?, ?, ?)', [userId, 1, 0]);
		});
	});
};

exports.run = async (client, message) => {
	if (!client.ready) return;
	let matches;

	/*if (message.channel.type === 'text') {
		updateUserXP(1, message.author.id);
	}*/

	if (/^ping$/i.test(message.content) /*&& !/^(?:236198969019990018|220333308569976834)$/.test(message.author.id)*/ ) {
		message.channel.send('pong', { tts: true });
	}
	if (/my avatar/i.test(message.content)) {
		message.reply(message.author.avatarURL);
	}
	if (/(?:^| )ch?ats?(?: |$)/i.test(message.content)) {
		message.react(Emoji.nature.cat);
	}
	if (/(?:^| )(?:chien|dog)s?(?: |$)/i.test(message.content)) {
		message.react(Emoji.nature.dog);
	}
	if (/\(\╯\°\□\°\）\╯\︵\ \┻\━\┻/.test(message.content)) {
		message.reply('PUT. THE. TABLE. BACK.');
	}
	if ((matches = message.content.match(/^([a-zA-Z])$/))) {
		let c = message.content.charCodeAt(0);
		switch (c) {
			case 'Z':
				c = 'A';
			case 'z':
				c = 'a';
			default:
				c = String.fromCharCode(++c);
		}
		message.reply(c);
	}
	if ((matches = message.content.match(/^([0-9]{1,15})$/))) {
		message.reply(Number(matches[1]) + 1);
	}
};
