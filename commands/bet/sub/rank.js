const config = require('../../../config.json');

module.exports = {
    name: 'rank',
    description: ' ',
    aliases: [],
    usage: `${config.prefix} `,
    category: 'bet',

    run: async (client, message, args) => {
        message.reply("rank")
        console.log(args);

    }
}