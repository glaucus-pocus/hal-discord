const settings = require('../settings.json');
const ddiff = require('deep-diff').diff;

exports.run = (client, oldMember, newMember) => {
  if (newMember.guild.id !== settings.home) return;
  const channel = newMember.guild.channels.find('name', settings.logs);
  if (!channel) return;

  const differences = ddiff(oldMember, newMember);
  const getData = (el, obj, data) => {
    if (el.path[0] === '_roles') {
      data = obj.guild.roles.get(data);
    }
    return data;
  };
  const translateDiff = (el) => {
    const name = el.path && (el.path.join('.') || '');
    switch (el.kind) {
      case 'N':
        return `added : ${name} (${getData(el, newMember, el.rhs)})`;
      case 'D':
        return `removed : ${name} (${getData(el, oldMember, el.lhs)})`;
      case 'E':
        return `edited : ${name} (${getData(el, oldMember, el.lhs)} => ${getData(el, newMember, el.rhs)})`;
      case 'A':
        el = Object.assign({}, el, el.item);
        el.path.push(el.index);
        return translateDiff(el);
      default:
        return '';
    }
  };

  let message = `${oldMember} changed :\n -`;
  message += differences.map(d => `\n - ${translateDiff(d)}`).join('');

  channel.send(message);
};
