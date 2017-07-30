const Emoji = require('discord-emoji');

exports.run = async (client, message) => {
  if (!client.ready) return;
  let matches;

  if (/^ping$/i.test(message.content) /* && !/^(?:236198969019990018|220333308569976834)$/.test(message.author.id) */) {
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
  if (/\(╯°□°）╯︵ ┻━┻/.test(message.content)) {
    message.reply('PUT. THE. TABLE. BACK.');
  }
  if ((matches = message.content.match(/^([a-zA-Z])$/))) {
    let c = message.content.charCodeAt(0);
    switch (c) {
      case 'Z':
        c = 'A';
        break;
      case 'z':
        c = 'a';
        break;
      default:
        c = String.fromCharCode(++c);
    }
    message.reply(c);
  }
  if ((matches = message.content.match(/^([0-9]{1,15})$/))) {
    message.reply(Number(matches[1]) + 1);
  }
};
