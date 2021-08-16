const fs = require('fs');

module.exports = {
    name: 'mood',
    aliases: ['billie'],
    description: 'Get a Billies\'s cute vid <3',
    category: 'fun',

    run: async (client, message, args) => {
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
           console.log( urls[Math.floor(Math.random() * urls.length)]);
            message.channel.send(" 💜 Billie Mood :heart_exclamation: ", {
                files: [
                    `https://i.imgur.com/${urls[Math.floor(Math.random() * urls.length)]}.mp4`,
                ]
            }).then(mex => {
                msg.delete()
            })
        })

    }
}
