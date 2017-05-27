const sql = require('sqlite');
const Emoji = require("discord-emoji");
const settings = require('../settings.json');

sql.open('./db.sqlite');

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

exports.run = (client, message) => {
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

    if (message.content.startsWith(settings.prefix)) {
        const command = message.content.slice(settings.prefix.length).split(' ')[0];
        const args = message.content.slice(settings.prefix.length + command.length + 1);
        const perms = client.elevation(message);
        let cmd;

        if (client.commands.has(command)) {
            cmd = client.commands.get(command);
        } else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command));
        }

        if (cmd) {
            if (perms < cmd.conf.permLevel)   {
                message.markAsError();
                return message.reply('tu n\'es pas autorisé à faire ça.');
            }
            if (cmd.conf.nsfw && !message.channel.nsfw) {
                message.markAsError();
                return message.reply('Grossier personnage !').catch(console.error);
            }
            try {
                cmd.run(client, message, args);
            } catch (err) {
                console.error(err);
            }
        }
    }

    /*const keys = Object.keys(settings.commands);
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
                    const commandFile = require(`../commands/${key}/${command}.js`);
                    commandFile.run(client, message, args);
                } catch (err) {
                    console.error(err);
                }
            }
            break;
        }
    }*/
};