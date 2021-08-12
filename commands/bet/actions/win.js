//TODO togli bet
const { MessageEmbed } = require('discord.js');
const fs = require("fs")

module.exports = {
    name: 'win',
    aliases: ['vincita'],
    description: 'Per riscuotere la vincita',
    run: async (client, message, args) => {
        let bets, winner, loser, punti, scommessa;
        let embedBets = new MessageEmbed()
            .setTitle("nullo")
            .setColor("#008f00")

        if (isNaN(args[1]) || args[1] < 1) return message.reply('Non c\'è quel numero  pepega');

        let indice = args[1] - 1
        console.log(indice);
        fs.readFile('data/bet.json', 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }
            const bet = JSON.parse(data.toString());
            bets = bet.bets
            if (indice > bets.length) return message.reply('non c\'è quel numero  (troppo grande)');
            //
            if (bets[indice][2] != message.author.id && bets[indice][3] != message.author.id ) return message.reply('non hai partecipato a quella bet');
            winner = message.author.id;
            if (bets[indice][2] === winner) { loser = bets[indice][3]; } else if (bets[indice][3] === winner) { loser = bets[indice[2]] }
            punti = parseInt(bets[indice][1])
            scommessa = bets[indice][0]
            message.react("👍")

            fs.readFile('data/classifica.json', 'utf-8', (err, data) => {
                if (err) {
                    throw err;
                }
                const classifica = JSON.parse(data.toString());
                //inveritre in lose
                client.on('messageReactionAdd', (reaction, user) => {
                    if (reaction.emoji.name === "👍" && user.id === loser) {
                        let puntiWin = classifica[winner] += punti
                        let puntiLos = classifica[loser] -= punti

                        const data2 = JSON.stringify(classifica);
                        fs.writeFile('data/classifica.json', data2, (err) => {
                            if (err) {
                                throw err;
                            }
                        });//write classificajson
                    }
                    embedBets
                        .setTitle("Bet Riscossa")
                        .setThumbnail("https://cdn3.iconfinder.com/data/icons/casino-and-gambling-1/50/Casino_And_Gambling_Casino_chips-44-512.png")
                        .setDescription(`<@${winner}> hai vinto ${punti} :coin: contro <@${loser}>\n${scommessa}`)
                        .setFooter("Che la fortuna vi arrida")
                    message.channel.send(embedBets)
                });//react
                
                
            });//leggi classificajson
            
            
            bet.bets.splice(indice, 1)
            const dataBet = JSON.stringify(bet);
            // write JSON string to a file
            fs.writeFile('data/bet.json', dataBet, (err) => {
                if (err) {
                    throw err;
                }


            });


        });//leggi betjson

    }
}