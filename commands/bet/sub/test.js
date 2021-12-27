const sql3 = require("sqlite3")
const tabPnt = "punteggi";
const tabBet = "scommessa";


function win(message, args) {
    message.reply("Coming soon")
}
function rank(message, args) {
    message.reply("Coming soon")

}
function signin(message, args) {
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
module.exports = { win, rank, signin }