module.exports = {
    name: 'search',
    description: 'search an anime in the list.',
    usage: 'search <anime name>',

    run: async(message) => {
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
    }
}