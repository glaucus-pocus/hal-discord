const settings = require('../settings.json');

exports.run = (client, oldMember, newMember) => {
        const channel = newMember.guild.channels.find('name', settings.logs);
        if (!channel) return;
        const newRoles = newMember.roles.filter(role => !oldMember.roles.has(role.id)).map(role => role.name);
        const removedRoles = oldMember.roles.filter(role => !newMember.roles.has(role.id)).map(role => role.name);

        let message = `${oldMember} changed :`;
        if (newRoles.length > 0) message += `\n - New roles : \`${newRoles.join('\`, \`')}\``;
    if (removedRoles.length > 0) message += `\n - Removed roles : \`${removedRoles.join('\`, \`')}\``;
    
    channel.send(message);
};