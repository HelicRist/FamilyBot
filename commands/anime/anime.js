const axios = require('axios');
require('colors');
const watchlist = require('../../watchlist.json');
const fs = require('fs');
const Discord = require('discord.js')

module.exports = {
    name: 'anime',
    description: 'mostra una lista di anime da guardare suddivisa in categorie',
    aliases: ['a'],
    category: ['anime'],

    run: async(client, message, args) => {
        let animeTitle = '';
        const command = args[0];
        args.shift();
        args.forEach(arg => {
            animeTitle = animeTitle + arg + ' ';
        });
        console.log(command);

        const options = {
            Headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }

        await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${animeTitle}`, options)
            .then(async response => {
                await axios.get(`https://kitsu.io/api/edge/anime/${response.data.data[0].id}/genres`, options)
                    .then(genres => {
                        let genresList = [];
                        genres.data.data.forEach(genre => {
                            console.log(genre.name);
                            genresList.push(genre.attributes.name);
                        });
                        message.channel.send(`Genere: ${genresList}`)
                    });
            })
            .catch(error => {
                message.reply(`:x: Nessun anime trovato con il nome di ${animeTitle}`);
                console.log((`Error querying ${animeTitle} in Kitsu APIs`).red);
            });

        client.animeCommands = new Discord.Collection();
        const animeCommandFiles = fs.readdirSync('./commands/anime/actions').filter(file => file.endsWith('.js'));
        for (const animeCommandFile of animeCommandFiles) {
            const command = require(`./actions/${animeCommandFile}`);
            client.animeCommands.set(command.name, command);
        }
        animeCommandFiles.map(command => console.log(command));


        for (const file of animeCommandFiles) {
            const animeCommand = require(`./actions/${file}`);
            client.animeCommands.set(animeCommand.name, animeCommand);
        }
        switch (command) {
            case 'add':
                client.animeCommands.get(command).run(message, client, animeTitle);
                break;
            case 'remove':
                client.animeCommands.get(command).run(message, client, animeTitle);
                break;
            case 'search':
                client.animeCommands.get(command).run(message, client, animeTitle);
                break;
            default:
                break;
        }
    }
}