const sql3 = require("sqlite3")
const tabPnt = "punteggi";
const tabBet = "scommessa";
const { MessageEmbed } = require('discord.js');


function win(message, args) {
    let sql = `UPDATE ${tabPnt}
            SET punti =punti + ?
            WHERE id = ?`;
    let data = [args[1], "662712189668294722"]
    let db = new sql3.Database('data/bet.db', sql3.OPEN_READWRITE, (err) => {
        if (err) { console.error(err.message); }
        console.log('Connected to the database.');
    });
            //update (win)
        db.run(sql, data, function (err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
        });
}

function rank(message, args) {
    let embedRank = new MessageEmbed()
    .setTitle("Errore")

    let players = []//<@id>: punti ,
    const db = new sql3.Database('data/bet.db', sql3.OPEN_READWRITE, (err) => {
        if (err) { console.error(err.message); }
        console.log('Connected to the chinook database.');
    });    //visualizza 
    db.serialize(() => {
        db.each(`SELECT * FROM ${tabPnt}`, (err, row) => {
            if (err) { console.error(err.message); }

            players.push(`<@${row.id}>: ${row.punti}`)
            embedRank
            .setTitle("Classifica Punti")
            .setDescription(players)
            .setThumbnail("https://www.pngkey.com/png/full/148-1488923_princess-peach-crown-stickers-by-sirrockalot-redbubble-princess.png")
            .setColor("#a58d00")
            message.channel.send(embedRank);
        });

    });
    //close
    db.close((err) => {
        if (err) { console.error(err.message); }
        console.log('Close the database connection.');
    });


}
function join(message, args) {
    const db = new sql3.Database('data/bet.db', sql3.OPEN_READWRITE, (err) => {
        if (err) { console.error(err.message); }
        console.log('Connected to the chinook database.');
    });
    let sql = `INSERT INTO punteggi (id,user,punti)
    VALUES (?,?,?)`;
    let data = [message.author.id, message.author.username, 100]
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