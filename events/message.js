const config = require('../config.json');

module.exports = {
    name: 'message',
    description: 'message event',
    run: async (client, message) => {
        if (message.author.bot) return;
        if (message.content.startsWith(config.prefix)) {
            const command = message.content.split(' ')[0].slice(config.prefix.length);
            const args = message.content.split(' ').slice(1);
            const commandObject = client.commands.get(command)
                || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
            if (commandObject) {
                commandObject.run(client, message, args);

                let commandEmbed = {
                    title: 'Comando richiamato',
                    description: `${message.author} => ${command}`,
                    fields: [{
                        name: 'Link al messaggio',
                        value: `[Click qui per un viaggio rapido](https://discord.com/channels/666312151354572801/${message.channel.id}/${message.id})`,
                    }],
                    color: '#154b85',
                }
                client.channels.cache.get(config.commandsLogChannelID).send({ embed: commandEmbed });
            } else {
                message.reply(`:x: Comando ${command} non trovato !`);
            }
        }
    }
}