const { Message } = require("discord.js");
const fs = require("fs");
const config = require('../../config.json');

module.exports = {
    name: 'help',
    description: 'Help command',
    run: async(client, message, args) => {
        let fields = [];
        const commandFolders = fs.readdirSync('./commands');
        for (const folder of commandFolders) {
            const commandFIles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
            let commands = '';
            for (const file of commandFIles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands += `${command.name}, `
            }
            fields.push({
                name: folder,
                value: commands,
            });
        }

        const helpEmbed = {
            title: 'Help',
            author: { name: 'Friendly Bot', icon_url: 'https://i.imgur.com/6A2jQnm.jpeg', url: 'https://i.imgur.com/6A2jQnm.jpeg' },
            description: 'Lista dei comandi che il bot offre.\nPer proposte, scrivere in <#867506577719296010>',
            color: '18f0af',
            fields: fields,
            thumbnail: { url: 'https://i.imgur.com/6A2jQnm.jpeg' },
        };

        message.channel.send({ embed: helpEmbed });
    }
}