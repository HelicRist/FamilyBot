
const fs = require("fs")
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: 'prof',
    description: 'Info e contatti sui prof',
    aliases: ['infoprof'],
    usage: `${config.prefix}prof <nome_prof>`,
    category: 'utility',

    run: async (client, message, args) => {
        let embedProf = new MessageEmbed().setTitle("Nome sbagliato!").setColor("#008B8B").setFooter(`${config.prefix}prof [nome prof]`)

        ;
        let profJSON;
        let nome;
        let cits = [];
        let img;
        let keys = [];
        fs.readFile('data/prof.json', 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }
            profJSON = JSON.parse(data.toString());
            for (let k in profJSON) keys.push(k);
            if (args.length < 1 ) {
                //nessun nome
                //message.reply("specifica un prof")
                embedProf
                .setTitle("Contatti prof")
                .setDescription(profJSON.mion)
                message.channel.send(embedProf);

            }
            else if (!(args[0] in profJSON)) {
                //non c'è nella lista prof
                embedProf
                .setTitle("Nome sbagliato")
                message.channel.send(embedProf);

            }
            else if ((args[0] in profJSON)) {
                nome = args[0]
                numero= profJSON[args[0]].numero
                mail= profJSON[args[0]].mail
                img = profJSON[args[0]].img
                embedProf
                .setTitle(nome)
                .setDescription(`${numero}\n${mail}`)
                .setThumbnail(img)
                message.channel.send(embedProf);
            }
        });

    }
}