
const fs = require("fs")
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const citJSON = require('../../data/cit.json')
//TODO: aggiungere cit numero, 

module.exports = {
    name: 'cit',
    description: 'Trova la tuas frase preferita tra più di mille disponibili',
    aliases: ['citazioni'],
    usage: `${config.prefix}cit <nome_prof>`,
    category: 'fun',

    run: async (client, message, args) => {
        let embedQuote = new MessageEmbed();
        let nome;
        let cits = [];
        let img;
        let keys = [];
        for (let k in citJSON) keys.push(k);
        if (args.length < 1 || (!(args[0] in citJSON) && isNaN(args[0]))) {
            message.channel.send({
                files: ['./media/frasi_prof.txt']
            });
        }
        else if (!isNaN(args[0])) {
            message.reply(" cit casuali di tutti COMING SOON")
        }
        else {
            if (args.length < 2 || isNaN(args[1]) || (!isNaN(args[1]) && args[1] < 1)) {
                nome = args[0].toLowerCase();

                if (!citJSON[nome]) {
                    return message.channel.send({
                        embed: {
                            description: `:x: Prof inesistente!`,
                            color: '#ff0000',
                        }
                    })
                }

                img = citJSON[nome].img
                cits = `•  ${citJSON[nome].cit.join('\n• ')}`

                embedQuote
                    .setTitle(nome)
                    .setDescription(`${cits}`)
                    .setThumbnail(img)
                    .setColor("#008B8B")
                    .setFooter(`${config.prefix} cit [nome prof] [n° frasi]`)
                message.channel.send(embedQuote);

            } else {// args[1] è un numero
                nome = args[0].toLowerCase();
                n = args[1]

                if (!citJSON[nome]) {
                    return message.channel.send({
                        embed: {
                            description: `:x: Prof inesistente!`,
                            color: '#ff0000',
                        }
                    })
                }

                img = citJSON[nome].img
                cits = `•  ${getRandom(citJSON[nome].cit, n).join('\n• ')}`

                embedQuote
                    .setTitle(nome)
                    .setDescription(`${cits}`)
                    .setThumbnail(img)
                    .setColor("#008B8B")
                    .setFooter(`${config.prefix} cit [nome prof] [n° frasi]`)
                message.channel.send(embedQuote);
            }
        }


        function getRandom(arr, n) {
            var result = new Array(n),
                len = arr.length,
                taken = new Array(len);
            if (n > len)
                throw new RangeError("getRandom: more elements taken than available");
            while (n--) {
                var x = Math.floor(Math.random() * len);
                result[n] = arr[x in taken ? taken[x] : x];
                taken[x] = --len in taken ? taken[len] : len;
            }
            return result;
        }
    }
}
