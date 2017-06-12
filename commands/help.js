const settings = require('../settings.json');

exports.run = (client, message, args) => {
    if (!args) {
        let commands = client.commands;
        const perms = client.elevation(message);
        commands = commands.filter(cmd => perms >= cmd.conf.permLevel);
        if (!message.channel.nsfw) commands = commands.filter(cmd => !cmd.conf.nsfw);
        const commandNames = Array.from(commands.keys());
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
        let msg = `Command List\n\n[Use '${settings.prefix}${exports.help.name} <command>' for details]\n\n`;
        msg += commands.map(cmd => `${settings.prefix}${cmd.help.name}${' '.repeat(longest - cmd.help.name.length)} > ${cmd.help.description}`).join('\n');
        message.channel.send(msg, {code: 'asciidoc'});
    } else {
        if (client.commands.has(args)) {
            const command = client.commands.get(args);
            const msg = `${command.help.name}\n${command.help.description}\nusage: ${command.help.usage}`;
            message.channel.send(msg, {code: 'asciidoc'});
        }
    }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['h'],
  permLevel: 0,
  nsfw: false
};

exports.help = {
  name: 'help',
  description: 'Displays all available commands for your permission level.',
  usage: 'help [command]'
};