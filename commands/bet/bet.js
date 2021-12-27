const { MessageEmbed } = require('discord.js');
const fs = require("fs")
const Discord = require('discord.js')
const config = require('../../config.json')
const sql3 = require("sqlite3")
const tabPnt = "punteggi";
const tabBet = "scommessa";

const subCommands = require('./sub/subcommands');

//TODO:
// comandi
//f.bet [user] [qnt] [scommessa]
//f.win [idScommessa]
//f.bet   mostra scommesse attive
//f.singin
//f.profile da vedersi se fare na roba esterna da bet
module.exports = {
    name: 'bet',
    description: 'Punteggi scommesse',
    aliases: ['b', 'scommesse', 'scommetto', 'scommessa'],
    usage: `${config.prefix}bet <user> <punti> <scommessa>\n${config.prefix}bet classifica\n${config.prefix}bet win <posizione_bet>`,
    category: 'fun',

    run: async (client, message, args) => {
        const db = new sql3.Database('data/bet.db', sql3.OPEN_READWRITE, (err) => {
            if (err) { console.error(err.message); }
            console.log('Connected to the chinook database.');
        });
        if (message.author.id != "342343548718284801" && message.author.id != "784807958742695966") { return message.reply("Coming soon") }
        let embed = new MessageEmbed()
            .setTitle("Bet in corso")
        switch (args[0]) {
            case "win":
                subCommands.win(message, args)
                break;
            case "rank":
                subCommands.rank(message, args)
                break;
            case "join":
                subCommands.join(message, args)
                break;
            default://scommessa con qualcuno
                let scommessa;
                let embed = new MessageEmbed()
                    .setTitle("Bet in corso")
                const opponent = message.mentions.users.first();
                if (opponent && !opponent.bot) {//se esiste utente, è nel server e non è un bot
                    const member = message.guild.member(opponent);
                    if (!member) return message.reply('Scommetti con qualcuno nel server pepega');
                    if (message.author.id === member.id) return message.reply('Scommetti con qualcun\'altro ffs pepega');
                    if (isNaN(args[1]) || args[1] < 1) return message.reply('Quantità di punti non valida pepega');
                    punti = parseInt(args[1])
                    if (args.length < 3) return message.reply('Scommetti su qualcosa! Non a caso');
                    scommessa = args.slice(2).join(" ")
                    message.react("👍")
                    client.on('messageReactionAdd', (reaction, user) => {
                        if (reaction.emoji.name === "👍" && user === opponent) {
                            console.log("accettata");
                            let sql = `INSERT INTO scommessa (idUser1,idUser2,punti,scommessa,aperta)
                        VALUES(?,?,?,?,?)`
                            let data = [message.author.id, opponent.id, punti, scommessa, 1]
                            console.log(data);
                            db.run(sql, data, function (err) {
                                if (err) {
                                    return console.error(err.message);
                                }
                                console.log(`Row(s) updated: ${this.changes}`);
                            });
                            embed
                                .setTitle('Scommessa Aggiunta')
                                .setDescription(`\n\  ${message.author} vs ${opponent} ${punti} :coin: \n\n${scommessa}`)
                                .setColor("#001eff")
                                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyHcDvZNdOBrsauNQJ4P5OMOfg65MnTG-z7d6Yu7b-UUWhC67mKuB8A-qb1TfJJ3bKUl0&usqp=CAU")
                            message.channel.send(embed);

                        }
                    });
                } else {//nessuno taggato e nessun comando secondario: mostra scommesse
                    let embed = new MessageEmbed()
                    .setTitle("Errore (mostra scommesse)")
                    db.serialize(() => {
                        db.each(`SELECT * FROM ${tabBet}`, (err, row) => {
                            if (err) { console.error(err.message); }
                            console.log(row);
                        });

                    });
                    embed
                    .setColor("#d20202")
                    .setTitle("Bet In Corso")
                    .setThumbnail("https://cdn3.iconfinder.com/data/icons/sport-vol-1-3/512/7-512.png")
                    .setDescription("betSingola")
                    .setFooter("═════════════")
                    message.channel.send(embed);

                }
                break;
        }


        // let sql = `UPDATE ${tabPnt}
        //     SET punti =punti + ?
        //     WHERE id = ?`;
        // let data = [args[0], "662712189668294722"]
        // let db = new sql3.Database('data/bet.db', sql3.OPEN_READWRITE, (err) => {
        //     if (err) { console.error(err.message); }
        //     console.log('Connected to the chinook database.');
        // });

        // //update (win)
        // db.run(sql, data, function (err) {
        //     if (err) {
        //         return console.error(err.message);
        //     }
        //     console.log(`Row(s) updated: ${this.changes}`);

        // });
        // //visualizza 
        // db.serialize(() => { db.each(`SELECT * FROM ${tabPnt}`, (err, row) => { if (err) { console.error(err.message); } console.log(row); }); });
        // db.close((err) => {
        //     if (err) { console.error(err.message); }
        //     console.log('Close the database connection.');
        // });

    }

}
