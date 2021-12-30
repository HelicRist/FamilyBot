const sql3 = require("sqlite3")
const tabPnt = "punteggi";
const tabBet = "scommessa";
const { MessageEmbed } = require('discord.js');
const config = require('../../../config.json')


function win(client,message, args) {
    const friendlyCoin = client.emojis.cache.find(emoji => emoji.name === "friendlyCoin");

    let embed = new MessageEmbed()
        .setTitle("Errore (win)")
    const db = new sql3.Database('data/bet.db', sql3.OPEN_READWRITE, (err) => {
        if (err) { console.error(err.message); }
        console.log('Leggo db');
    });
    let winner, loser, idBet, punti, scommessa;
    //win dare punti
    let sql = `UPDATE ${tabPnt}
            SET punti =punti + ?
            WHERE id = ?`;
    if (isNaN(args[1])) return message.reply(":x: Devi inserire un numero :x:")
    idBet = args[1]
    winner = message.author.id;
    //visualizza per: numero punti, idUser perdente
    db.all(`SELECT * FROM ${tabBet} WHERE id =${idBet}`, [], (err, rows) => {
        if (err) { throw err; }
        if (message.author.id != rows[0].idUser1 && message.author.id != rows[0].idUser2) return message.reply(":x: Questa scommessa non ti riguarda :x:")
        if (rows[0].aperta != 1) { return message.reply(":x: Bet già reclamata :x:") }
        message.react("👍")

        if (winner != rows[0].idUser2) {
            loser = rows[0].idUser2;
        } else loser = rows[0].idUser1;
        punti = rows[0].punti;
        scommessa = rows[0].scommessa;
        //NUOVO
        setTimeout(() => {
            client.on('messageReactionAdd', (reaction, user) => {
                if (reaction.emoji.name === "👍" && user.id === loser) {
                    updateWinAndLoose()
                    embed
                        .setColor("#008f00")
                        .setTitle("Bet Riscossa")
                        .setThumbnail("https://cdn3.iconfinder.com/data/icons/casino-and-gambling-1/50/Casino_And_Gambling_Casino_chips-44-512.png")
                        .setDescription(`<@${winner}> hai vinto ${punti} ${friendlyCoin} contro <@${loser}>\n${scommessa}`)
                        .setFooter("Che la fortuna vi arrida")
                    message.channel.send(embed);
                }
            });
        }, 10 * 1000);
        //FINE NUOVO
        function updateWinAndLoose() {

            let data = [punti, winner]
            //update (win)
            db.run(sql, data, function (err) {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`Row(s) updated: ${this.changes}`);
            });
            //sql per perdente
            data = [-punti, loser];
            db.run(sql, data, function (err) {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`Row(s) updated: ${this.changes}`);
            });
            //sql per aperta=0
            db.run(`UPDATE ${tabBet}
    SET aperta =${0}
    WHERE id = ${idBet}`, function (err) {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`Row(s) updated: ${this.changes}`);
            });
        }

    });//fine lettura



}

function rank(client,message, args) {
    const friendlyCoin = client.emojis.cache.find(emoji => emoji.name === "friendlyCoin");

    let embedRank = new MessageEmbed()
        .setTitle("Errore")

    let players = []
    const db = new sql3.Database('data/bet.db', sql3.OPEN_READWRITE, (err) => {
        if (err) { console.error(err.message); }
        console.log('Connesso (rank)');
    });

    db.all(`SELECT * FROM ${tabPnt}`, [], (err, rows) => {
        if (err) { throw err; }

        rows.forEach((row) => {

            players.push(`<@${row.id}>: ${row.punti} ${friendlyCoin}`)
        });
        embedRank
            .setTitle("Classifica Punti")
            .setDescription(players)
            .setThumbnail("https://www.pngkey.com/png/full/148-1488923_princess-peach-crown-stickers-by-sirrockalot-redbubble-princess.png")
            .setColor("#a58d00")
        message.channel.send(embedRank);

    });
    //close
    db.close((err) => {
        if (err) { console.error(err.message); }
    });


}
function join(client,message, args) {
    const db = new sql3.Database('data/bet.db', sql3.OPEN_READWRITE, (err) => {
        if (err) { console.error(err.message); }
        console.log('Connected to the chinook database.');
    });
    let sql = `INSERT INTO punteggi (id,user,punti)
    VALUES (?,?,?)`;
    let data = [message.author.id, message.author.username, config.initialScore]
    db.run(sql, data, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);

    });
    db.close((err) => {
        if (err) { console.error(err.message); }
        console.log('Close the database connection.');
    });
    client.users.fetch(message.author.id).then((user) => {
        let embeDM = new MessageEmbed()
            .setTitle('Sei stato registrato con successo!')
            .setThumbnail(config.iconUrl)
            .setColor("3498db")
            .setDescription(`\nEcco una lista dei comandi per iniziare a scommettere:
        **${config.prefix}bet**: per una lista delle scommesse in corso
        **${config.prefix}bet rank**: per la classifica
        **${config.prefix}bet** <@sfidante> <quantità_scommessa> <testo_scommessa>: per scommettere
        **${config.prefix}bet win id_scommessa**: per riscuotere la scommessa
        \n\nBuon divertimento!`)
            .setFooter("e buona ludopatia")

        user.send(embeDM)
    });
    console.log(`Utente ${message.author.username} aggiunto`);
}
module.exports = { win, rank, join }