const fs = require('fs');
const config = require('../../config.json')

module.exports = {
    name: 'mood',
    description: 'Get a Billies\'s cute vid <3',
    aliases: ['billie'],
    usage: [`${config.prefix}mood`],
    category: 'fun',

    run: async (client, message, args) => {
        message.channel.send(':x: Work in progress!')
	let urls = [
            "Rnn9ESx",
            "e1QfsGK",
            "hjcvQOF",
            "2D7lIQf",
            "T5CqJpL",
            "EG7hzG3",
            "JdtIqCw",
            "u6W3jUJ",
            "9cNCgMZ",
            "sFyudgT",
            "NvSlcLN",
            "jcQ8NLF",
            "00hdkLm",        
        ]
         message.channel.send(" Cercando...").then(msg => {

            message.channel.send(`https://i.imgur.com/${urls[Math.floor(Math.random() * urls.length)]}.mp4`) 
            .then(mex => {
                msg.edit(" 💜 Billie Mood :heart_exclamation: ")
            })
        });

    }
}
