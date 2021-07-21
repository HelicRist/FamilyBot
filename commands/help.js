const { Message } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'help command',

    run: async(client, message, args) => {
        message.reply('HELP COMMAND');
    }
}