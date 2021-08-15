const fs = require('fs');
const axios = require('axios');
const config = require('../../../config.json');

module.exports = {
    name: 'add',
    description: 'Aggiunge un anime alla watchlist.',
    aliases: ['a'],
    usage: `${prefix}add`,
    category: 'anime',

    run: async (message, animeTitle) => {
        const options = {
            Headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }

        let anime = JSON.parse(fs.readFileSync('./data/watchlist.json'));
        let exists = false;

        await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${animeTitle}`, options)
            .then(async response => {
                await axios.get(`https://kitsu.io/api/edge/anime/${response.data.data[0].id}/genres`, options)
                    .then(genres => {
                        genres.data.data.forEach(genreOBJ => {
                            let genre = genreOBJ.attributes.name;
                            genre = genre.replace(/\s/g, 'Z');
                            genre = genre.replace('-', '_');

                            anime[genre].forEach(anime => {
                                if (anime == response.data.data[0].attributes.abbreviatedTitles[0]) {
                                    exists = true;
                                }
                            })

                            if (!exists) {
                                anime[genre].push(response.data.data[0].attributes.abbreviatedTitles[0])
                            }
                        });
                        fs.writeFile('watchlist.json', JSON.stringify(anime), (err) => {
                            return err;
                        })
                        if (!exists) {
                            message.channel.send({
                                embed: {
                                    description: `:green_circle: ${response.data.data[0].attributes.abbreviatedTitles[0]} è stato aggiunto alla watchlist!`,
                                    color: 0x00FF00
                                }
                            })
                        }
                        else {
                            message.channel.send({
                                embed: {
                                    description: `:blue_circle: ${response.data.data[0].attributes.titles.en_jp} è già presente nella watchlist!`,
                                    color: '#18f0af'
                                }
                            })
                        }
                    });
            })
            .catch(error => {
                message.channel.send({
                    embed: {
                        color: '#ec4c4c',
                        description: `:red_circle: Errore nell'inserimento di ${animeTitle}`
                    }
                });
                console.log((`Error querying ${animeTitle} in Kitsu APIs`).red);
            });


    }
}