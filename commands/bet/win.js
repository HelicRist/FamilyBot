//TODO togli bet
const { MessageEmbed } = require('discord.js');
const fs = require("fs")

module.exports = {
    name: 'win',
    aliases: ['w'],
    description: 'Per riscuotere la vincita',
    run: async (client, message, args) => {
        let bets, winner, loser, punti, scommessa;
        let embedBets = new MessageEmbed()
            .setTitle("nullo")
            .setColor("#008f00")

        if (isNaN(args[1]) || args[1] < 1) return message.reply('Non c\'è quel numero  pepega');

        let indice = args[1] - 1

        fs.readFile('data/bet.json', 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }
            const bet = JSON.parse(data.toString());
            bets = bet.bets
            if (indice > bets.length) return message.reply('non c\'è quel numero  (troppo grande)');
            //
            if (bets[indice][2] != message.author.id) return message.reply('non hai partecipato a quella bet');
            message.react("👍")

            fs.readFile('data/classifica.json', 'utf-8', (err, data) => {
                if (err) {
                    throw err;
                }
                const classifica = JSON.parse(data.toString());

                winner = message.author.id;
                loser = bets[indice][3];
                punti = parseInt(bets[indice][1])
                scommessa = bets[indice][0]
                client.on('messageReactionAdd', (reaction, user) => {
                    if (reaction.emoji.name === "👍" && user.id === loser) {
                        let puntiWin = classifica[winner] += punti
                        let puntiLos = classifica[loser] -= punti
                        //testare loser in classifica non huise
                        const data2 = JSON.stringify(classifica);
                        fs.writeFile('data/classifica2.json', data2, (err) => {
                            if (err) {
                                throw err;
                            }
                            console.log("JSON data is saved.");

                            embedBets
                                .setTitle("Bet Riscossa")
                                .setThumbnail("https://cdn3.iconfinder.com/data/icons/casino-and-gambling-1/50/Casino_And_Gambling_Casino_chips-44-512.png")
                                .setDescription(`<@${winner}> hai vinto ${punti} :coin: contro <@${loser}>\n${scommessa}`)
                                .setFooter("Che la fortuna vi arrida")
                            message.channel.send(embedBets);
                        });//write classificajson
                    }
                });//react


            });//leggi classificajson

        });//leggi betjson

    }
}