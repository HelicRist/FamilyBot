const { MessageEmbed } = require('discord.js');
const classificaJSON = require("../classifica.json")
const fs = require("fs")
const listID = require('../listID.json');

// TODO: fil partecipanti e punti
// file scommesse in corso 


module.exports = {
    name: 'bet',
    aliases: ['b', 'scommesse', 'scommetto', 'scommessa'],
    description: 'Punteggi scommesse',
    run: async(client, message, args) => {
        let embed = new MessageEmbed();
        let embedBets = new MessageEmbed()
            .setTitle("Bet in corso")
            .setColor("#001eff")
        let punti;
        let scommessa;
        //ti sfido a capire questa parte di codice
        let classifica = JSON.parse(fs.readFileSync("classifica.json"))
        let keys = [];
        for (let k in classifica) keys.push(k);
        let values = [];
        let keysID = [];
        let valuseID = [];
        for (let d in listID) keysID.push(d);

        printValues(classifica)
        printID(listID)
        let part = [];
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === "Heldin") {
                part.push(`${listID.idHel.toString()}: ${values[i]}`)
            } else {
                part.push(`${valuseID[i]}: \t\t ${values[i]}`)
            }
        } //

        const user = message.mentions.users.first();
        if (user && !user.bot) { //se esiste utente, è nel server e non è un bot

            const member = message.guild.member(user);
            if (!member) return message.reply('Scommetti con qualcuno nel server pepega');
            if (message.author.id === member.id) return message.reply('Scommetti con qualcun\'altro ffs pepega');
            if (isNaN(args[1]) || args[1] < 1) return message.reply('Quantità di punti non valida pepega');
            punti = args[1]
            if (args.length < 3) return message.reply('Scommetti su qualcosa! Non a caso');
            scommessa = args.slice(2).join(" ")



            embed
                .setTitle('Scommessa Aggiunta')
                .setDescription(`\n\nScommessi ${punti} :coin:  con ${user} \n\n${scommessa}`)
                .setColor("#d20202")
                .setThumbnail("https://cdn3.iconfinder.com/data/icons/sport-vol-1-3/512/7-512.png")
                // .then()
            message.channel.send(embed);



            //nessuno taggato: comando default
        } else {
            let file = JSON.parse(fs.readFileSync('bet.json'));

            embed
                .setTitle("Classifica Punti")
                .setDescription(part)
                .setThumbnail("https://www.pngkey.com/png/full/148-1488923_princess-peach-crown-stickers-by-sirrockalot-redbubble-princess.png")
                .setColor("#a58d00")
            message.channel.send(embed);
            embedBets
                .setDescription("bet in corso bl bla")
            message.channel.send(embedBets);


        }



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