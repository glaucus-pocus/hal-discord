const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const secret = require('./secret.json');
const Emoji = require("discord-emoji");
const sql = require('sqlite');
const fs = require('fs');

sql.open('./db.sqlite');

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

const updateUserXP = (points, userId) => {
    sql.get(`SELECT xp, level FROM users WHERE id = '${userId}'`).then(row => {
        if (!row) {
            sql.run('INSERT INTO users (id, xp, level) VALUES (?, ?, ?)', [userId, 1, 0]);
        } else {
            sql.run(`UPDATE users SET xp = ${row.xp + points} WHERE id = ${userId}`)
        }
    }).catch(() => {
        console.error;
        sql.run('CREATE TABLE IF NOT EXISTS users (id TEXT, xp INTEGER, level INTEGER)').then(() => {
            sql.run('INSERT INTO users (id, xp, level) VALUES (?, ?, ?)', [userId, 1, 0]);
        });
    });
};

client.on('message', message => {
    let matches;

    if (message.channel.type === 'text') {
        updateUserXP(1, message.author.id);
    }

    if (/^ping$/i.test(message.content) /*&& !/^(?:236198969019990018|220333308569976834)$/.test(message.author.id)*/ ) {
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
    if (/\(\╯\°\□\°\）\╯\︵\ \┻\━\┻/.test(message.content)) {
        message.reply('PUT. THE. TABLE. BACK.');
    }
    if ((matches = message.content.match(/^([a-zA-Z])$/))) {
        let c = message.content.charCodeAt(0);
        switch (c) {
            case 'Z':
                c = 'A';
            case 'z':
                c = 'a';
            default:
                c = String.fromCharCode(++c);
        }
        message.reply(c);
    }
    if ((matches = message.content.match(/^([0-9]{1,15})$/))) {
        message.reply(Number(matches[1]) + 1);
    }

    const keys = Object.keys(settings.commands);
    for (let key of keys) {
        const commandGroup = settings.commands[key];
        if (message.content.startsWith(commandGroup.prefix)) {
            if (!message.member.roles.some(role => settings.commands[key].roles.includes(role.name))) {
                message.reply('tu n\'es pas autorisée à faire ça, bitch');
            } else {
                const command = message.content.split(' ')[0].slice(commandGroup.prefix.length);
                const args = message.content.slice(commandGroup.prefix.length + command.length + 1);

                if (/\.\./.test(command)) {
                    message.reply('Tu y as vraiment cru ?');
                    break;
                }

                try {
                    const commandFile = require(`./commands/${key}/${command}.js`);
                    commandFile.run(client, message, args);
                } catch (err) {
                    console.error(err);
                }
            }
            break;
        }
    }
});

client.login(secret.token);