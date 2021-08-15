const axios = require('axios');
const fs = require('fs')
const config = require('../../../config.json');

module.exports = {
    name: 'remove',
    description: 'Rimuove un anime dalla watchlist.',
    aliases: ['r', 'rm', 'rem'],
    usage: `${config.prefix}remove <anime_name>`,
    category: 'anime',

    run: async (message, animeTitle) => {
        let animeJSON = JSON.parse(fs.readFileSync('./data/watchlist.json'));

        let list = []
        Object.entries(animeJSON).map(anime => {
            if (anime[1].length > 0) {
                anime[0] = anime[0].replace('Z', ' ').replace('_', '-')
                list.push(anime);
            }
        })


        const options = {
            Headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }

        let exists = false;
        await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${animeTitle}`, options)
            .then(async response => {
                let animeName = response.data.data[0].attributes.abbreviatedTitles[0];

                list.forEach(row => {
                    row[1].forEach(anime => {
                        if (anime == animeName) {
                            exists = true;
                            row[1].splice(row[1].indexOf(anime), 1);
                        }
                    })
                })

                if (!exists) {
                    message.channel.send({
                        embed: {
                            color: '#ec4c4c',
                            description: `:red_circle: ${animeName} non è nella lista!`
                        }
                    })
                }
                else {
                    message.channel.send({
                        embed: {
                            description: `:green_circle: ${animeName} è stato rimosso alla watchlist!`,
                            color: 0x00FF00
                        }
                    })

                    fs.writeFile('watchlist.json', JSON.stringify(animeJSON), (err) => {
                        return err;
                    })
                }
            });
    }
}