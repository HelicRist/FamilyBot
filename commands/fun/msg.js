const config = require('../../config.json')

module.exports = {
    name: 'msg',
    description: `Invia un messaggio ad un canale.`,
    aliases: ['messaggio', 'message'],
    usage: ` ${config.prefix}msg <essaggio>`,
    category: 'fun',

    run: async(client, message, args) => {
        message.channel.send(message.content);
        message.delete();
    }
}