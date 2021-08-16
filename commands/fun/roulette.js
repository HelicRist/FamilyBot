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
            `sei salvo, per ora... 🔫`,
            `sei salvo, per ora... 🔫`,
            `sei salvo, per ora... 🔫`,
            `sei salvo, per ora... 🔫`,
            `sei salvo, per ora... 🔫`,
            `unlucky bro ☠️`
        ]
        const embed = new MessageEmbed()
            .setTitle(' RUSSIAN ROULETTE ')
            .setColor(0x8334eb)
            .setDescription('Dovresti provare la versione hard! Con 6 proiettili... purtroppo non ne abbiamo feedback\n\n**Reacta per joinare**');
        if (args[0] != "start") {
            message.channel.send(embed)
                .then(embedMessage => {
                    embedMessage.react("🥐")
                });
            client.on('messageReactionAdd', (reaction, user) => {
                if (reaction.emoji.name === "🥐" && !user.bot) {
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
            if (players.length < 2) return message.channel.send(`Questo è suicidio... mi piace ma non è una roulette russa da soli`);
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

                if (scelta === 'unlucky bro ☠️') {
                    players.splice(i, 1);
                    message.channel.send("Ricarico la rivoltella... 🔥")
                    sixshooter = [
                        `sei salvo, per ora... 🔫`,
                        `sei salvo, per ora... 🔫`,
                        `sei salvo, per ora... 🔫`,
                        `sei salvo, per ora... 🔫`,
                        `sei salvo, per ora... 🔫`,
                        `unlucky bro ☠️`
                    ]
                } else if (scelta === 'sei salvo, per ora... 🔫') {
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
