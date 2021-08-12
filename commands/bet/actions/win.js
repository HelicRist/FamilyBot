
const { MessageEmbed } = require('discord.js');
const fs = require("fs")

module.exports = {
    name: 'test',
    aliases: ['test'],
    description: 't',
    run: async (client, message, args) => {
        let embedBets = new MessageEmbed()
            .setTitle("nullo")
            .setColor("#008f00")
        if (isNaN(args[1]) || parseInt(args[1] < 1)) return message.reply(':x: Bet non valida :x:');
        let indice = args[1] - 1
        let bets = []
        let winner, loser, punti, scommessa,classifica;
        message.react("👍")
        
        fs.readFile('data/bet2.json', 'utf-8', (err, dataB) => {
            if (err) { throw err; }
            bet = JSON.parse(dataB.toString());
            bets = bet.bets
            
            if (!(message.author.id === bets[indice][2] || message.author.id === bets[indice][3])) { return message.reply('Non hai partecipato alla bet') }
            winner = message.author.id
            if (message.author.id === bets[indice][2]) {
                loser = bets[indice][3]
            } else if (message.author.id === bets[indice][3]) {
                loser = bets[indice][2]
            }
            scommessa = bets[indice][0]
            punti = parseInt(bets[indice][1])
            client.on('messageReactionAdd', (reaction, user) => {
                if (reaction.emoji.name === "👍" && user.id === loser) {
                    fs.readFile('data/classifica2.json', 'utf-8', (err, dataC) => {
                        if (err) { throw err; }
                        classifica = JSON.parse(dataC.toString());

                        classifica[winner] += punti
                        classifica[loser] -= punti

                        const dataC2 = JSON.stringify(classifica);
                        fs.writeFile('data/classifica2.json', dataC2, (err) => {
                            if (err) { throw err; }

                        });//write c
                        bet.bets.splice(indice, 1)
                        const dataB2 = JSON.stringify(bet);
                        fs.writeFile('data/bet2.json', dataB2, (err) => {
                            if (err) { throw err; }
                        });//write b

                    });//leggi classifica
                    embedBets
                    .setTitle("Bet Riscossa")
                    .setThumbnail("https://cdn3.iconfinder.com/data/icons/casino-and-gambling-1/50/Casino_And_Gambling_Casino_chips-44-512.png")
                    .setDescription(`<@${winner}> hai vinto ${punti} :coin: contro <@${loser}>\n${scommessa}`)
                    .setFooter("Che la fortuna vi arrida")
                message.channel.send(embedBets)
            message.reply(bets[indice])
         }
            });
        });//leggi bet
    }
}