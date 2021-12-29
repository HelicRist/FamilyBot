const sql3 = require("sqlite3")
const tabPnt = "punteggi";
const tabBet = "scommessa";
const { MessageEmbed } = require('discord.js');
const config = require('../../../config.json')


function win(message, args) {
    const db = new sql3.Database('data/bet.db', sql3.OPEN_READWRITE, (err) => {
        if (err) { console.error(err.message); }
        console.log('Leggo db');
    });
    let winner, looser, idBet, punti;
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
        if (winner != rows[0].idUser2) {
            looser = rows[0].idUser2;
        } else looser = rows[0].idUser1;
        punti = rows[0].punti;

        console.log(`user winner  ${winner}\n
    loser:${looser} \n
    punti:${punti} \n
    noBet ${idBet}`);
        let data = [punti, winner]
        //update (win)
        db.run(sql, data, function (err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
        });
        //sql per perdente
        data = [-punti, looser];
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

    });//fine lettura



}

function rank(message, args) {
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

            players.push(`<@${row.id}>: ${row.punti}`)
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
function join(message, args) {
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

    console.log("fatto");
}
module.exports = { win, rank, join }