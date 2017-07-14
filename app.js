const komada = require("komada");

const settings = require('./settings.json');
const token = require('./secret.json').token;

const client = new komada.Client({
	ownerID: settings.ownerID,
	prefix: settings.prefix,
	clientOptions: {
		fetchAllMembers: true,
	},
});

client.login(token);
