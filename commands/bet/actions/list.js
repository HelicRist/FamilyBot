
const { MessageEmbed } = require('discord.js');
const fs = require("fs")
const listID = require('../listID.json');

// TODO: fil partecipanti e punti
// file scommesse in corso 

module.exports = {
    name: 'list',
    aliases: ['lista'],
    description: 'Scommesse in corso',
    run: async (client, message, args) => {

        let embedBets = new MessageEmbed()
            .setTitle("Bet in corso")
            .setColor("#001eff")

        let bets
        let gambl1;
        let gambl2;
        let punti;
        let motivo;
        let betlist = [];
        let betSingola;
        fs.readFile('data/bet.json', 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }
            const bet = JSON.parse(data.toString());

            bets = bet.bets

            for (let i = 0; i < bets.length; i++) {
                motivo = bets[i][0] + "  "
                punti = bets[i][1] + "  "
                gambl1 = `<@${bets[i][2]}>`
                gambl2 = `<@${bets[i][3]}>`
                betlist.push(`══════════════════════════════════════\n${motivo} \n ${punti}:coin: da ${gambl1} vs ${gambl2}\n`)
                betSingola = betlist.join(" ")
            }

            embedBets
                .setTitle("Bet In Corso")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyHcDvZNdOBrsauNQJ4P5OMOfg65MnTG-z7d6Yu7b-UUWhC67mKuB8A-qb1TfJJ3bKUl0&usqp=CAU")
                .setDescription(betSingola)
                .setFooter("Punti non riborsabili")
            message.channel.send(embedBets);

        });
    }
}