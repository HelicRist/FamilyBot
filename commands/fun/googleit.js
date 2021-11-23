const fs = require("fs")
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
//TODO: aggiungere cit numero, 

module.exports = {
    name: 'googleit',
    description: 'Crea una pagina googleit',
    aliases: ['google', 'googleIt', 'googla', 'cercati'],
    usage: `${config.prefix}googleit <frase>`,
    category: 'fun',

    run: async (client, message, args) => {
        if (args.length < 1) {
            return message.channel.send({
                embed: {
                    color: '#ec4c4c',
                    description: `Inserisci una frase da googlare!`
                }
            });
        }
        
        let link = (config.googleItLink).replace('sentence', args.join('%20'))
        message.channel.send(link);
    }
}