const axios = require('axios');
require('colors');
const fs = require('fs');
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'anime',
    description: 'Mostra tutta la watchlist',
    aliases: ['a', 'animes'],
    usage: `${config.prefix}a`,
    category: 'anime',

    run: async (client, message, args) => {
        client.animeCommands = new Discord.Collection();
        const animeCommandFiles = fs.readdirSync('./commands/anime/actions').filter(file => file.endsWith('.js'));
        for (const animeCommandFile of animeCommandFiles) {
            const command = require(`./actions/${animeCommandFile}`);
            client.animeCommands.set(command.name, command);
        }

        let animeTitle = '';
        const command = args[0];
        if (client.animeCommands.get(command) !== undefined) {
            args.shift();
            args.forEach(arg => {
                animeTitle = animeTitle + arg + ' ';
            });
            client.animeCommands.get(command).run(message, animeTitle);
        }
        else {
            let animeJSON = JSON.parse(fs.readFileSync('./data/watchlist.json'));
            let animes = []
            Object.entries(animeJSON).map(anime => {
                if(anime[1].length > 0){
                    anime[0] = anime[0].replace('Z', ' ').replace('_','-')
                    animes.push(anime);
                }
            })
            const embed = index => {
                const current = animes.slice(index, index + 10)

                // you can of course customise this embed however you want
                return new MessageEmbed({
                    title: `(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ANIMELIST ${index} - ${index + current.length} su ${animes.length}`,
                    fields: current.map(g => ({
                        name: g[0],
                        value: g[1].length > 0 ? g[1].join(', ') : '-',
                    })),
                    color: '#18f0af'
                })
            }

            message.channel.send(embed(0)).then(message => {
                if (animes.length <= 10) return;
                //message.react('⏪')
                message.react('⏩')

                const collector = message.createReactionCollector((reaction, user) => ['⏪', '⏩'].includes(reaction.emoji.name) && user.id !== client.user.id, { time: 60000 });


                let currentIndex = 0;

                collector.on('collect', async reaction => {
                    await message.reactions.removeAll();
                    reaction.emoji.name === '⏪' ? currentIndex -= 10 : currentIndex += 10;
                    await message.edit(embed(currentIndex));
                    if (currentIndex !== 0) message.react('⏪');
                    if (currentIndex + 10 < animes.length) message.react('⏩');
                })
            })

        }
    }
}