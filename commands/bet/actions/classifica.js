
const { MessageEmbed } = require('discord.js');
const fs = require("fs")
const listID = require('../listID.json');

// TODO: fil partecipanti e punti
// file scommesse in corso 

module.exports = {
    name: 'classifica',
    aliases: ['rank'],
    description: 'Classifica delle scommesse',
    run: async (client, message, args) => {
        let embed = new MessageEmbed();
        let part = [];

        let punti;
        let scommessa;
        //ti sfido a capire questa parte di codice
        let classifica = JSON.parse(fs.readFileSync("data/classifica.json"))
        let keys = [];
        for (let k in classifica) keys.push(k);
        let values = [];
        let keysID = [];
        let valuseID = [];
        for (let d in listID) keysID.push(d);

        printValues(classifica)
        printID(listID)
        for (let i = 0; i < keys.length; i++) {

            part.push(`${valuseID[i]}: \t\t ${values[i]}`)

        }//

        embed
            .setTitle("Classifica Punti")
            .setDescription(part)
            .setThumbnail("https://www.pngkey.com/png/full/148-1488923_princess-peach-crown-stickers-by-sirrockalot-redbubble-princess.png")
            .setColor("#a58d00")
        message.channel.send(embed);


        function printValues(classifica) {
            for (var k in classifica) {
                if (classifica[k] instanceof Object) {
                    printValues(classifica[k]);
                } else {
                    values.push(classifica[k])
                };
            }
        };
        function printID(listID) {
            for (var k in listID) {
                if (listID[k] instanceof Object) {
                    printValues(listID[k]);
                } else {
                    valuseID.push(listID[k])
                };
            }
        };
    }
}