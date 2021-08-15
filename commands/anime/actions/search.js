const axios = require('axios');

module.exports = {
    name: 'search',
    description: 'Cerca un anime nel web.',
    aliases: ['s'],
    usage: `${prefix}search <anime_name>`,
    category: 'anime',

    run: async (message, animeTitle) => {
        const options = {
            Headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }

        console.log(animeTitle);

        await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${animeTitle}`, options)
            .then(async response => {
                await axios.get(`https://kitsu.io/api/edge/anime/${response.data.data[0].id}/genres`, options)
                    .then(genres => {
                        let genresList = [];
                        genres.data.data.forEach(genre => {
                            genresList.push(genre.attributes.name);
                        });
                        genresList.push('.');

                        let animeEmbed = {
                            title: response.data.data[0].attributes.titles.en_jp,
                            description: response.data.data[0].attributes.synopsis,
                            url: response.data.data[0].attributes.canonicalURL,
                            color: '#18f0af',
                            thumbnail: {
                                url: response.data.data[0].attributes.posterImage.small
                            },
                            image: {
                                url: response.data.data[0].attributes.coverImage.small
                            },
                            fields: [
                                {
                                    name: ':fire: Generi:',
                                    value: genresList.join(', '),
                                },
                                {
                                    name: ':calendar_spiral: Uscito il:',
                                    value: response.data.data[0].attributes.startDate,
                                },
                                {
                                    name: ':cinema: Episodi:',
                                    value: response.data.data[0].attributes.episodeCount,
                                    inline: true
                                },
                                {
                                    name: ':hourglass_flowing_sand: Durata:',
                                    value: response.data.data[0].attributes.episodeLength + 'm',
                                    inline: true
                                },
                                {
                                    name: ':100: Valutazione:',
                                    value: response.data.data[0].attributes.averageRating,
                                    inline: true
                                }
                            ]
                        }

                        message.channel.send({ embed: animeEmbed });
                    });
            })
            .catch(error => {
                message.channel.send({
                    embed: {
                        color: '#ec4c4c',
                        description: `:red_circle: Nessun anime trovato con il nome di ${animeTitle}`
                    }
                });
                console.log((`Error querying ${animeTitle} in Kitsu APIs`).red);
            });
    }
}