const { Client } = require('komada');

const config = require('./config.json');
const token = require('./secret.json').token;

class Bot extends Client {
  constructor(...args) {
    super(...args);
  }
}


new Bot(config).login(token);
