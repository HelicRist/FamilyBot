const { Message } = require("discord.js");
const fs = require("fs");

module.exports = {
    name: 'help',
    description: 'Help command',

    run: async(client, message, args) => {
        let commands = []
        client.commands.map(cmd => commands.push(cmd));

        let fields = []
        commands.forEach(cmd => {
            fields.push({
                name: cmd.name,
                value: cmd.description,
            })
        })

        let helpEmbed = {
            title: "Help List",
            description: `Lista dei comandi che il bot offre. Per proposte contattare <@617745189670223911> o <@342343548718284801>`,
            author: { name: 'Friendly Bot', icon_url: 'https://i.imgur.com/6A2jQnm.jpeg', url: 'https://i.imgur.com/6A2jQnm.jpeg' },
            fields: fields,
            color: '#18f0af',
            thumbnail: { url: 'https://i.imgur.com/6A2jQnm.jpeg' },

        }

        message.channel.send({ embed: helpEmbed });
    }
}