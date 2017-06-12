const moment = require('moment');

exports.log = (msg) => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] `, msg);
};
exports.warn = (msg) => {
    console.warn(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] `, msg);
};
exports.error = (msg) => {
    console.error(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] `, msg);
};
exports.info = (msg) => {
    console.info(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] `, msg);
};