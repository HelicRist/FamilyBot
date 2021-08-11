
const { MessageEmbed } = require('discord.js');
const fs = require("fs")
const Discord = require('discord.js')

// TODO: fil partecipanti e punti
// file scommesse in corso 

module.exports = {
    name: 'bet',
    aliases: ['b', 'scommesse', 'scommetto', 'scommessa'],
    description: 'Punteggi scommesse',
    run: async (client, message, args) => {
        const command = args[0];
        let embed = new MessageEmbed()
            .setTitle("Bet in corso")
            .setColor("#001eff")


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
                        if (err) {
                            throw err;
                        }
                        const bet = JSON.parse(data.toString());
                        const add =  [scommessa,parseInt(punti),message.author.id,opponent.id]
                        bets = bet.bets
                        bets.push(add)
                      console.log(bet);
            
                      const data2 = JSON.stringify(bet);
                      // write JSON string to a file
                      fs.writeFile('data/bet.json', data2, (err) => {
                          if (err) {
                              throw err;
                          }
                          console.log("JSON data is saved.");
                      });
                    });
                    embed
                        .setTitle('Scommessa Aggiunta')
                        .setDescription(`\n\ ${punti} :coin:| ${message.author} vs ${opponent} \n\n${scommessa}`)
                        .setColor("#d20202")
                        .setThumbnail("https://cdn3.iconfinder.com/data/icons/sport-vol-1-3/512/7-512.png")
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
            betCommandFiles.map(command => console.log(command));

            for (const file of betCommandFiles) {
                const betCommand = require(`./actions/${file}`);
                client.betCommands.set(betCommand.name, betCommand);
            }
            switch (command) {
                case 'list':
                    client.betCommands.get(command).run(client, message, args);
                    break;
                case 'classifica':
                    client.betCommands.get(command).run(client, message, args);
                    break;

                default:
                    client.betCommands.get("list").run(client, message, args);
                    //o un comando help
                    break;
            }

        }

    }

}