
const fs = require("fs")
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
//TODO: aggiungere cit numero, 
module.exports = {
    name: 'cit',
    aliases: ['citazioni'],
    description: 'Trova la tuas frase preferita tra più di mille disponibili',
    category :'fun',
    run: async (client, message, args) => {
        let embedQuote = new MessageEmbed();
        let citJSON;
        let nome;
        let cits = [];
        let img;
        let keys = [];
        fs.readFile('data/cit.json', 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }
            citJSON = JSON.parse(data.toString());
            for (let k in citJSON) keys.push(k);
            if (args.length < 1 || ( !(args[0] in citJSON) && isNaN(args[0]) )) {
                message.channel.send({
                    files: ['./media/frasi_prof.txt']
                });
            }
            else if(!isNaN(args[0])){
                message.reply(" cit casuali di tutti COMING SOON")
            }
             else {
                if(args.length<2 ||  isNaN(args[1]) || (!isNaN(args[1]) && args[1]<1 )  ) {
                nome = args[0].toLowerCase();
                switch (nome) {
                    case "silvia":
                        img = citJSON.silvia.img
                        cits = `•  ${citJSON.silvia.cit.join('\n• ')}`
                        break;
                    case "carla":
                        img = citJSON.carla.img
                        cits = `•  ${citJSON.carla.cit.join('\n• ')}`
                        break;
                    case "irene":
                        img = citJSON.irene.img
                        cits = `•  ${citJSON.irene.cit.join('\n• ')}`
                        break;
                    case "antonella":
                        img = citJSON.antonella.img
                        cits = `•  ${citJSON.antonella.cit.join('\n• ')}`
                        break;
                    case "mion":
                        img = citJSON.mion.img
                        cits = `•  ${citJSON.mion.cit.join('\n• ')}`
                        break;
                    case "tacchin":
                        img = citJSON.tacchin.img
                        cits = `•  ${citJSON.tacchin.cit.join('\n• ')}`
                        break;
                    case "altro":
                        img = citJSON.altro.img
                        cits = `•  ${citJSON.altro.cit.join('\n• ')}`
                        break;
                }

                embedQuote
                    .setTitle(nome)
                    .setDescription(`${cits}`)
                    .setThumbnail(img)
                    .setColor("#008B8B")
                    .setFooter(`${config.prefix} cit [nome prof] [n° frasi]`)
                message.channel.send(embedQuote);
            }else{// args[1] è un numero
                nome = args[0].toLowerCase();
                n = args[1]
                switch (nome) {
                    case "silvia":
                        img = citJSON.silvia.img
                        cits = `•  ${getRandom(citJSON.silvia.cit,n).join('\n• ')}`
                        break;
                    case "carla":
                        img = citJSON.carla.img
                        cits = `•  ${getRandom(citJSON.carla.cit,n).join('\n• ')}`
                        break;
                    case "irene":
                        img = citJSON.irene.img
                        cits = `•  ${getRandom(citJSON.irene.cit,n).join('\n• ')}`
                        break;
                    case "antonella":
                        img = citJSON.antonella.img
                        cits = `•  ${getRandom(citJSON.antonella.cit,n).join('\n• ')}`
                        break;
                    case "mion":
                        img = citJSON.mion.img
                        cits = `•  ${getRandom(citJSON.mion.cit,n).join('\n• ')}`
                        break;
                    case "tacchin":
                        img = citJSON.tacchin.img
                        cits = `•  ${getRandom(citJSON.tacchin.cit,n).join('\n• ')}`
                        break;
                    case "altro":
                        img = citJSON.altro.img
                        cits = `•  ${getRandom(citJSON.altro.cit,n).join('\n• ')}`
                        break;
                }
                embedQuote
                .setTitle(nome)
                .setDescription(`${cits}`)
                .setThumbnail(img)
                .setColor("#008B8B")
                .setFooter(`${config.prefix} cit [nome prof] [n° frasi]`)
            message.channel.send(embedQuote);
            }
        }
        });
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