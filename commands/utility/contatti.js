const fs = require("fs")
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const contatti = require('../../data/contatti.json');
const cit = require('../../data/cit.json');
module.exports = {
    name: 'prof',
    description: 'Info e contatti sui prof',
    aliases: ['infoprof'],
    usage: `${config.prefix}prof <nome_prof>`,
    category: 'utility',

    run: async (client, message, args) => {
        if(args<1){
            let fields = [];
            for(let prof in contatti){
                fields.push({
                    name: `${prof}`,
                    value: `${contatti[prof].mail} - ${contatti[prof].numero}`,
                });
            }
            return message.channel.send({embed: {
                color: 3447003,
                title: "Contatti dei prof",
                fields: fields
            }})
        }

        let prof = args[0];
        prof.toLowerCase();

        if(!contatti[prof]){
            return message.channel.send({
                embed: {
                    description: `:x: Prof inesistente!`,
                    color: '#ff0000',
                }
            })
        }

        console.log(prof);
        message.channel.send({
            embed: {
                color: '#00ff00',
                title: `${prof.toUpperCase()}`,
                description: cit[prof].cit[0],
                fields: [
                    {
                        name: 'Contatti',
                        value: `Mail: ${contatti[prof].mail}\nNumero: ${contatti[prof].numero}`,
                    },
                ],
                thumbnail: { url: contatti[prof].img },
            }
        })
    }
}