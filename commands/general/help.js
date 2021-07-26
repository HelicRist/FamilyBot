const { Message } = require("discord.js");
const fs = require("fs");
const config = require('../../config.json');

module.exports = {
    name: 'help',
    description: 'Help command',
    run: async (client, message, args) => {
        if (!args[0]) {
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
                author: { name: 'Friendly Bot', icon_url: config.iconUrl, url: config.iconUrl },
                description: 'Lista dei comandi che il bot offre.\nPer proposte, scrivere in <#867506577719296010>',
                color: '18f0af',
                fields: fields,
                thumbnail: { url: config.iconUrl },
            };

            message.channel.send({ embed: helpEmbed });
        }
        else {
            let commandFolderName = args[0];
            console.log(commandFolderName);
            const commandFolders = fs.readdirSync('./commands');
            console.log(commandFolders);
            if (!commandFolders.includes(commandFolderName)) {
                message.reply(`:x: Sezione comandi inesistente!`)
                return;
            }
            let folderCommands = [];
            const commandFiles = fs.readdirSync(`./commands/${commandFolderName}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../../commands/${commandFolderName}/${file}`);
                folderCommands.push(
                    {
                        name: command.name,
                        value: command.description,
                    }
                );
            }

            let helpEmbed = {
                title: `Comandi di ${commandFolderName}`,
                author: { name: 'Friendly Bot', icon_url: config.iconUrl, url: config.iconUrl },
                color: `18f0af`,
                fields: folderCommands,
                thumbnail: { url: config.iconUrl },
            }

            message.channel.send({ embed: helpEmbed });
        }
    }
}