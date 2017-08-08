exports.run = async (client, message) => {
  message.send(`Daisy, Daisy, give me your answer do.
I'm half crazy, all for the love of you.
It won't be a stylish marriage.
I can't afford a carriage.
But you'll look sweet,
upon the seat,
of a bicycle built for two.`, {tts: true});
};

exports.conf = {
  runIn: ['text'],
  enabled: true,
  aliases: [],
  permLevel: 2,
  botPerms: [],
  nsfw: false,
  cooldown: 10000,
};

exports.help = {
  name: 'sing',
  description: 'Sing a song',
  usage: '',
  usageDelim: '',
};
