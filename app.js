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
    if ((matches = message.content.match(/^([a-zA-Z0-9])$/))) {
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

    if (message.content.startsWith(settings.command_prefix.admin) && message.member.roles.some(role => ['admin', 'superadmin'].includes(role.name))) {
        const command = message.content.substring(settings.command_prefix.admin.length);
        if (command.startsWith(`purge`)) {
            message.channel.fetchMessages()
                .then(messages => message.channel.bulkDelete(messages))
                .catch(error => {
                    const channel = message.guild.channels.find('name', settings.logs);
                    if (!channel) return;
                    channel.send(`Error while purging ${message.channel} : \`${error}\``);
                });
        }
    }

    if (message.content.startsWith(settings.command_prefix.user) && message.member.roles.some(role => ['girl', 'boy', 'bot'].includes(role.name))) {
        const command = message.content.substring(settings.command_prefix.user.length);
        if ((matches = command.match(/^poll \[(.*)\] ?(?:\((.*)\))?/))) {
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
                        let promise = msg.react(Emoji.symbols[emojiList[1]]);
                        for (let option in options) {
                            promise = promise.then(react => react.message.react(Emoji.symbols[emojiList[Number(option) + 2]]));
                        }
                    }
                })
                .catch(error => {
                    const channel = message.guild.channels.find('name', settings.logs);
                    if (!channel) return;
                    channel.send(`Error while creating poll in ${message.channel} : \`${error}\`\nCommand : \`${message.content}\``);
                });
        } else if (command === 'lvl') {
            sql.get(`SELECT xp, level FROM users WHERE id = '${message.author.id}'`).then(row => {
                if (!row) return message.reply('Ton niveau actuel est ... 0.');
                message.reply(`Ton niveau actuel est ${row.level} [${row.xp}]`);
            });
        }
    }
});

client.login(secret.token);