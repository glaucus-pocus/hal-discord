const Emoji = require('discord-emoji');

exports.conf = {
	type: 'method',
	method: 'markAsDone',
	appliesTo: ['Message'],
};

exports.extend = function () {
	return this.react(Emoji.symbols.o);
};