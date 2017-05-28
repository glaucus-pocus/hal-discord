const settings = require('../settings.json');
const Emoji = require("discord-emoji");

exports.run = (client, message, args) => {
    let matches;
    if ((matches = args.match(/^\[(.*)\] ?(?:\((.*)\))?/))) {
        const title = matches[1];
        const options = matches[2] ? matches[2].split(' ;; ') : [];
        let msg = `**${title}**`;
        for (let option in options) {
            msg += `\n **${Number(option) + 1}**. \`${options[option]}\``;
        }
        message.channel.send(msg)
            .then(msg => {
                const emojiList = {
                    1: 'one',
                    2: 'two',
                    3: 'three',
                    4: 'four',
                    5: 'five',
                    6: 'six',
                    7: 'seven',
                    8: 'eight',
                    9: 'nine'
                };
                if (options.length > 0) {
                    let promise = false;
                    for (let option in options) {
                        if (promise) {
                            promise = promise.then(react => react.message.react(Emoji.symbols[emojiList[Number(option) + 1]]));
                        } else {
                            promise = msg.react(Emoji.symbols[emojiList[1]]);
                        }
                    }
                }
            })
            .catch(error => {
                const channel = message.guild.channels.find('name', settings.logs);
                if (!channel) return;
                channel.send(`Error while creating poll in ${message.channel} : \`${error}\`\nCommand : \`${message.content}\``);
            });
    } else {
        message.channel.send('Pas comme ça qu\'ça s\'écrit !');
    }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['p?'],
  permLevel: 2,
  nsfw: false
};

exports.help = {
  name: 'poll',
  description: 'Creates a poll',
  usage: 'poll [<question>] (<choices separated with ;; >)'
};