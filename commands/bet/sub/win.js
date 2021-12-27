const config = require('../../../config.json');

module.exports = {
    name: 'win',
    description: ' ',
    aliases: [],
    usage: `${config.prefix} `,
    category: 'bet',

    run: async (message, args) => {
       
        console.log(args);

    }
}