const config = require('../../config.json')

module.exports = {
    name: 'msg',
    description: `Invia un messaggio ad un canale. ${config.prefix}msg messaggio`,
    aliases: ['messaggio', 'message'],
    category: 'fun',

    run: async(client, message, args) => {
        message.channel.send(message.content);
        message.delete();
    }
}