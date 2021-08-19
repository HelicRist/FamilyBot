const fs = require("fs")
const config = require('../../config.json');

module.exports = {
    name: "meme",
    description: `Manda un video/foto divertente mandati in sto server`,
    aliases: ["randomeme","sorprendimi"],
    usage: `${config.prefix}meme`,
    category: "fun",
    run: async (client, message, args) => {
      
        fs.readFile('data/media.json', 'utf-8', (err, data) => {
            let mediaJson = JSON.parse(data)
            message.channel.send(mediaJson.data[Math.floor(Math.random() * mediaJson.data.length)])

        });

}
}
