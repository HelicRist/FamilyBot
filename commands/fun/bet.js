
const { MessageEmbed } = require('discord.js');
const fs = require("fs")
const Discord = require('discord.js')
const config = require('../../config.json')

// TODO: fil partecipanti e punti
// file scommesse in corso 

module.exports = {
    name: 'bet',
    description: 'Punteggi scommesse',
    aliases: ['b', 'scommesse', 'scommetto', 'scommessa'],
    usage: `${config.prefix}bet <user> <punti> <scommessa>\n${config.prefix}bet classifica\n${config.prefix}bet win <posizione_bet>`,
    category: 'utility',

    run: async (client, message, args) => {
        const command = args[0];
        let scommessa;
        let embed = new MessageEmbed()
            .setTitle("Bet in corso")

        const opponent = message.mentions.users.first();
        if (opponent && !opponent.bot) {//se esiste utente, è nel server e non è un bot
            const member = message.guild.member(opponent);
            if (!member) return message.reply('Scommetti con qualcuno nel server pepega');
            if (message.author.id === member.id) return message.reply('Scommetti con qualcun\'altro ffs pepega');
            if (isNaN(args[1]) || args[1] < 1) return message.reply('Quantità di punti non valida pepega');
            punti = args[1]
            if (args.length < 3) return message.reply('Scommetti su qualcosa! Non a caso');
            scommessa = args.slice(2).join(" ")
            message.react("👍")
            client.on('messageReactionAdd', (reaction, user) => {
                if (reaction.emoji.name === "👍" && user === opponent) {

                    fs.readFile('data/bet.json', 'utf-8', (err, data) => {

                        let bet = JSON.parse(data)
                        const add = [scommessa, parseInt(punti), message.author.id, opponent.id]
                        bets = bet.bets
                        bets.push(add)

                        fs.writeFile('data/bet.json', JSON.stringify(bet), (err) => {
                            if (err) { throw err; }
                        });
                    });
                    embed
                        .setTitle('Scommessa Aggiunta')
                        .setDescription(`\n\  ${message.author} vs ${opponent} ${punti} :coin: \n\n${scommessa}`)
                        .setColor("#001eff")
                        .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyHcDvZNdOBrsauNQJ4P5OMOfg65MnTG-z7d6Yu7b-UUWhC67mKuB8A-qb1TfJJ3bKUl0&usqp=CAU")
                    message.channel.send(embed);
                }
            });

            //nessuno taggato: comandi secondari
        } else {
            client.betCommands = new Discord.Collection();
            const betCommandFiles = fs.readdirSync('./commands/bet/actions').filter(file => file.endsWith('.js'));
            for (const betCommandFile of betCommandFiles) {
                const command = require(`./actions/${betCommandFile}`);
                client.betCommands.set(command.name, command);
            }

            for (const file of betCommandFiles) {
                const betCommand = require(`./actions/${file}`);
                client.betCommands.set(betCommand.name, betCommand);
            }
            switch (command) {
                case 'classifica':
                    let players = [];
                    let classifica = JSON.parse(fs.readFileSync("data/classifica.json"))
                    let keys = [];
                    let values = [];
                    for (let k in classifica) { keys.push(k); values.push(classifica[k]) }

                    for (let i = 0; i < keys.length; i++) { players.push(`<@${keys[i]}>: \t\t ${values[i]}`) }

                    embed
                        .setTitle("Classifica Punti")
                        .setDescription(players)
                        .setThumbnail("https://www.pngkey.com/png/full/148-1488923_princess-peach-crown-stickers-by-sirrockalot-redbubble-princess.png")
                        .setColor("#a58d00")
                    break;
                case 'win':
                    let winner, loser;

                    if (isNaN(args[1]) || args[1] < 1) return message.reply('Non c\'è quel numero  pepega');
                    let indice = args[1] - 1
                    bet = JSON.parse(fs.readFileSync("data/bet.json"))
                    bets = bet.bets
                    if (indice > bets.length) return message.reply('non c\'è quel numero  (troppo grande)');
                    if (bets[indice][2] != message.author.id && bets[indice][3] != message.author.id) return message.reply('non hai partecipato a quella bet');
                    message.react("👍")

                    winner = message.author.id;
                    if (winner == bets[indice][2]) { loser = bets[indice][3] } else if (winner == bets[indice][3]) { loser = bets[indice][2] }
                    punti = parseInt(bets[indice][1])
                    scommessa = bets[indice][0]
                    setTimeout(() => {

                        client.on('messageReactionAdd', (reaction, user) => {
                            if (reaction.emoji.name === "👍" && user.id === loser) {

                                fs.readFile('data/classifica.json', 'utf-8', (err, data) => {
                                    if (err) { throw err; }
                                    let classifica = JSON.parse(data)
                                    classifica[winner] += punti
                                    classifica[loser] -= punti

                                    fs.writeFile('data/classifica.json', JSON.stringify(classifica), (err) => {
                                        if (err) { throw err; }
                                    });//write classificajson

                                });
                                fs.readFile('data/bet.json', 'utf-8', (err, data) => {
                                    let bet = JSON.parse(data)

                                    bet.bets.splice(indice, 1)
                                    const dataB = JSON.stringify(bet);
                                    fs.writeFile('data/bet.json', dataB, (err) => {
                                        if (err) { throw err; }
                                    });//write bet
                                });

                                embed
                                    .setColor("#008f00")
                                    .setTitle("Bet Riscossa")
                                    .setThumbnail("https://cdn3.iconfinder.com/data/icons/casino-and-gambling-1/50/Casino_And_Gambling_Casino_chips-44-512.png")
                                    .setDescription(`<@${winner}> hai vinto ${punti} :coin: contro <@${loser}>\n${scommessa}`)
                                    .setFooter("Che la fortuna vi arrida")
                                message.channel.send(embedBets);
                            }
                        });//react

                    }, 400);
                    break;

                default:
                    let bets, gambl1, gambl2, punti, motivo, betSingola
                    let betlist = [];
                    let bet = JSON.parse(fs.readFileSync("data/bet.json"))
                    bets = bet.bets
                    if (bets.length < 1) {
                        betSingola = "Ancora nessuna bet \n* cespuglio secco che rotola *"
                    } else {
                        for (let i = 0; i < bets.length; i++) {
                            motivo = bets[i][0] + "  "
                            punti = bets[i][1] + "  "
                            gambl1 = `<@${bets[i][2]}>`
                            gambl2 = `<@${bets[i][3]}>`
                            betlist.push(`**${i + 1}**     ══════════\n${motivo} \n ${punti}:coin: da ${gambl1} vs ${gambl2}\n`)
                            betSingola = betlist.join(" ")
                        }
                    }
                    embed
                        .setColor("#d20202")
                        .setTitle("Bet In Corso")
                        .setThumbnail("https://cdn3.iconfinder.com/data/icons/sport-vol-1-3/512/7-512.png")
                        .setDescription(betSingola)
                        .setFooter("═════════════")
                    break;
            }
            message.channel.send(embed);
        }

    }

}
