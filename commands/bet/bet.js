const { MessageEmbed } = require('discord.js');
const fs = require("fs")
const Discord = require('discord.js')
const config = require('../../config.json')
const sql3 = require("sqlite3")
const tabPnt = "punteggi";
const tabBet = "scommessa"


client.betCommands = new Discord.Collection();
const betCommandFiles = fs.readdirSync('./commands/bet/sub').filter(file => file.endsWith('.js'));

for (const betCommandFile of betCommandFiles) {
    const command = require(`./sub/${betCommandFile}`);
    client.betCommands.set(command.name, command);
}


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
       
       message.reply("Coming soon")
       const command = args[0];
       const commandObject = client.animeCommands.get(command)
           || client.animeCommands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
       if (commandObject) {
           args.shift();
           args.forEach(arg => {
               animeTitle = animeTitle + arg + ' ';
           });
           commandObject.run(message, animeTitle);
       }
       //comando default con 0 args
       else {

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
