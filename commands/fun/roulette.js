
const { Client, MessageEmbed, MessageManager } = require('discord.js');

module.exports = {
    name: "roulette",
    description: "russian roulette, enjoy",
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
        message.channel.send(embed)
            .then(embedMessage => {
                embedMessage.react("🥐")
            });
        client.on('messageReactionAdd', (reaction, user) => {
            if (reaction.emoji.name === "🥐" && !user.bot) {
                players.push(user)
            }
        });

        setTimeout(() => {

            if (players.length < 1) return message.channel.send(`Nessuno vuole giocare? ):`);
            if (players.length < 2) return message.channel.send(`Questo è suicidio... mi piace ma non è una roulette russa da soli`);
            let i = 0
            let scelta;
            message.channel.send(`FUCK THE SUSPANCE`)

            while (i < players.length && players.length > 1) {
                scelta = sixshooter[Math.floor(Math.random() * sixshooter.length)]
                message.channel.send(`${players[i]}, tocca a te...`)
                // setTimeout(() => {
                message.channel.send(`${scelta}`)
                //  }, 600);

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
            }
            message.channel.send(`${players}: hai vinto, per poter morire un altro giorno `)
        }, 5000);
        function rr(scelta) {

        }
    }
}