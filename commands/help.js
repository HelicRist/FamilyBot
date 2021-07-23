const { Message } = require("discord.js");
const fs = require("fs");
const config = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Help command',
    aliases: ['commands', 'command-list'],
    //TODO: help args in base alla categoria di comandi (music, fun...)
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
            description: `Lista dei comandi che il bot offre. Per proposte contattare ${config.idRimaro.toString()} o ${config.idHeldin.toString()}`,
            author: { name: 'Friendly Bot', icon_url: config.iconUrl, url: config.iconUrl},
            fields: fields,
            color: '#18f0af',
            thumbnail: { url: config.iconUrl },

        }

        message.channel.send({ embed: helpEmbed });
    }
}