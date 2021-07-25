const watchlistJSON = require('../../../watchlist.json');
const fs = require('fs');
const axios = require('axios');

module.exports = {
    name: 'add',
    description: 'Add an anime to the list.',
    usage: 'add <anime name>',

    run: async(message, client, animeTitle) => {
        let watchlist = JSON.parse(fs.readFileSync('watchlist.json'));

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
                            genresList.push(genre.attributes.name);
                        });

                        watchlist.types.forEach(type => {
                            genresList.forEach(genre => {
                                console.log(`${type.genre} && ${genre}`);
                                console.log(type.genre === genre);
                                if (type.genre == genre) {
                                    watchlist.types.push({
                                        genre: genre,
                                        anime: [animeTitle],
                                    });
                                    console.log('Doesnt exist');
                                    fs.writeFile('watchlist.json', JSON.stringify(watchlist), (err) => {
                                        if (err) {
                                            throw err;
                                        }
                                        console.log("JSON data is saved.");
                                    });
                                } else {
                                    console.log('Exsists');
                                }
                            });
                        });
                        console.log(watchlist);

                    });
            })

        console.log(watchlist);
    }
}