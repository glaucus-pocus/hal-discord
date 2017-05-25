const settings = require('../settings.json');
const Emoji = require("discord-emoji");

exports.run = (client, member) => {
    member.guild.defaultChannel.send(`${member} est maintenant banni !`).then(message => {
        message.react(Emoji.people.smiling_imp);
    });

    const channel = member.guild.channels.find('name', settings.logs);
    if (!channel) return;
    channel.send(`banned member : ${member}`);
};