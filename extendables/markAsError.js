const Emoji = require('discord-emoji');

exports.conf = {
  type: 'method',
  method: 'markAsError',
  appliesTo: ['Message'],
};

// eslint-disable-next-line func-names
exports.extend = function () {
  return this.react(Emoji.symbols.x);
};
