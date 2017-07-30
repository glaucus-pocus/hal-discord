const Emoji = require('discord-emoji');

exports.conf = {
  type: 'method',
  method: 'markAsError',
  appliesTo: ['Message'],
};

exports.extend = function () {
  return this.react(Emoji.symbols.x);
};
