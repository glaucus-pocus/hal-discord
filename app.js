const Discord = require('discord.js');
const Emoji = require("discord-emoji");
const client = new Discord.Client();
const fs = require('fs');
const settings = require('./settings.json');
const token = require('./secret.json').token;
const Log = require('./utils/log.js');

Discord.Message.prototype.markAsDone = function() {
    this.react(Emoji.symbols.o).catch(Log.error);
};

Discord.Message.prototype.markAsError = function() {
    this.react(Emoji.symbols.x).catch(Log.error);
};

Discord.Message.prototype.markAsQuestion = function() {
    this.react(Emoji.symbols.question).catch(Log.error);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
    if (err) return Log.error(err);
    Log.info(`Loading a total of ${files.length} commands.`);
    files.forEach(file => {
        const props = require(`./commands/${file}`);
        Log.info(`Loading command: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

fs.readdir('./events/', (err, files) => {
    if (err) return Log.error(err);
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.elevation = (message) => {
    let level;
    const role = message.member.highestRole;
    switch (role.name) {
        case 'superadmin':       level = 10; break;
        case 'admin':            level = 5; break;
        case 'bot': case 'dev':  level = 3;  break;
        case 'boy': case 'girl': level = 2; break;
        default:                 level = 0;
    }
    if (message.author.id === settings.ownerid) level = 90;
    return level;
};

client.login(token);