const { Client, MessageEmbed, MessageManager } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "roulette",
    description: "russian roulette, enjoy",
    aliases: ["roulette"],
    usage: `${config.prefix}roulette`,
    category: "fun",
    run(client, message, args) {
        let players = []
        let sixshooter = [
            `sei salvo, per ora... ๐ซ`,
            `sei salvo, per ora... ๐ซ`,
            `sei salvo, per ora... ๐ซ`,
            `sei salvo, per ora... ๐ซ`,
            `sei salvo, per ora... ๐ซ`,
            `unlucky bro โ ๏ธ`
        ]
        const embed = new MessageEmbed()
            .setTitle(' RUSSIAN ROULETTE ')
            .setColor(0x8334eb)
            .setDescription('Dovresti provare la versione hard! Con 6 proiettili... purtroppo non ne abbiamo feedback\n\n**Reacta per joinare**');
        if (args[0] != "start") {
            message.channel.send(embed)
                .then(embedMessage => {
                    embedMessage.react("๐ฅ")
                });
            client.on('messageReactionAdd', (reaction, user) => {
                if (reaction.emoji.name === "๐ฅ" && !user.bot) {
                    players.push(user)
                    players.forEach(p => {
                        if (p.id !== user.id) {
                        }
                    });
                }
            });
        }

        setTimeout(() => {
            rrGame();

        }, 5000);

        function waitforme(ms) {
            return new Promise(resolve => { setTimeout(resolve, ms); });
        }

        async function rrGame() {

            if (players.length < 1) return message.channel.send(`Nessuno vuole giocare? ):`);
            if (players.length < 2) return message.channel.send(`Questo รจ suicidio... mi piace ma non รจ una roulette russa da soli`);
            let i = 0
            let scelta;
            while (i < players.length && players.length > 1) {
                //timeout([0, 5], 1, function(i){
                scelta = sixshooter[Math.floor(Math.random() * sixshooter.length)]
                message.channel.send(`${players[i]}, tocca a te...`).then(message => {
                    setTimeout(() => {
                        message.edit(`${players[i]}, ${scelta}`)
                        
                    }, 1000);
                   // message.channel.send()
                });
                await waitforme(2000); // loop will be halted here until promise is resolved

                if (scelta === 'unlucky bro โ ๏ธ') {
                    players.splice(i, 1);
                    message.channel.send("Ricarico la rivoltella... ๐ฅ")
                    sixshooter = [
                        `sei salvo, per ora... ๐ซ`,
                        `sei salvo, per ora... ๐ซ`,
                        `sei salvo, per ora... ๐ซ`,
                        `sei salvo, per ora... ๐ซ`,
                        `sei salvo, per ora... ๐ซ`,
                        `unlucky bro โ ๏ธ`
                    ]
                } else if (scelta === 'sei salvo, per ora... ๐ซ') {
                    sixshooter.shift();
                }
                i++;
                if (i >= players.length) { i = 0 }
                // });
            }
            message.channel.send(`${players}: sei sopravvissuto per poter morire un altro giorno `)

        }


    }
}
