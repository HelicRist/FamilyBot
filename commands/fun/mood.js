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
	/*let urls = [
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
<<<<<<< HEAD
        let files = fs.readdirSync('media/billie.json');
        message.channel.send(" Cercando...").then(msg => {
           console.log( urls[Math.floor(Math.random() * urls.length)]);
            message.channel.send(" 💜 Billie Mood :heart_exclamation: ", {
                files: [
                    `https://i.imgur.com/${urls[Math.floor(Math.random() * urls.length)]}.mp4`,
                ]
            }).then(mex => {
                msg.delete()
            })
        })*/
=======
         message.channel.send(" Cercando...").then(msg => {

            message.channel.send(`https://i.imgur.com/${urls[Math.floor(Math.random() * urls.length)]}.mp4`) 
            .then(mex => {
                msg.edit(" 💜 Billie Mood :heart_exclamation: ")
            })
        });
>>>>>>> 4854d845e7ac62846ca9bec66e09b440757bc31a

    }
}
