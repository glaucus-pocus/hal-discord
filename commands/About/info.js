exports.run = async (client, msg) => msg.sendMessage(`_HAL (**H**euristically programmed **AL**gorithmic computer) is a sentient computer that controls the systems of the Discovery One spacecraft. 
He is mostly depicted as a camera lens containing a red or yellow dot.

HAL is capable of speech, speech recognition, facial recognition, natural language processing, lip reading,
art appreciation, interpreting emotional behaviours, automated reasoning, and playing chess (and sometimes killing humans)._

HAL is a Discord bot based on Komada framework, using the Discord.js library.`);

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['details', 'what'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: 'info',
  description: 'Provides some information about this bot.',
  usage: '',
  usageDelim: '',
};
