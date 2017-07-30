exports.run = async (client, message, [dice]) => {
  const str = dice.replace(/(\d*)d(\d+)/gi, (match, $1, $2) => {
    $1 = $1 || 1;
    const val = [];
    for (let i = 0; i < $1; ++i) {
      val.push(Math.floor((Math.random() * $2) + 1));
    }
    return `(${val.join(' + ')})`;
  });
  if (/[^()\d\s=\-+\\*]/.test(str)) {
    return message.reply('je sais pas ce que tu essayes de faire ...');
  }

  let val;
  try {
    val = new Function(`return ${str}`)(); // eslint-disable-line
  } catch (err) {
    console.error(err);
    return message.reply('je sais pas ce que tu essayes de faire ...');
  }
  return message.reply(`${val}. Détail : ${str}`);
};

exports.conf = {
  runIn: ['text'],
  enabled: true,
  aliases: [],
  permLevel: 2,
  botPerms: [],
  nsfw: false,
};

exports.help = {
  name: 'roll',
  description: 'Rolls some dice',
  usage: '<dice:str>',
  usageDelim: '',
};
