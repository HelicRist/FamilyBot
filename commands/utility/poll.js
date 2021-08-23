
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "poll",
    description: `Crea una poll.`,
    aliases: ["domanda"],
    usage: `${config.prefix}poll <domanda>-<opzione1>-<opzione2>`,
    category: "fun",
    run: async (client, message, args) => {

        let embed = new MessageEmbed().setTitle("vuoto").setColor("#6a2445");

        let domanda;
        let risposte = [];
        let qna;
        if (args.length < 1) return message.reply(`usa "${config.prefix}poll <domanda>;<opzione1>;<opzione2>"`);
        //domanda si o no
        qna = args.join(" ").split(";")
        domanda = qna[0]

        if (qna.length < 2) {

            embed
                .setTitle(':question: '+ domanda+' :question: ')
                .setDescription(`:thumbsup: Sì\n\n:thumbsdown: No`);
            message.channel.send(embed).then(sentEmbed => {
                sentEmbed.react("👍")
                sentEmbed.react("👎")
                sentEmbed.react(``)
            })


            //piu risposte
        } else {
            const a = message.guild.emojis.cache.find(emoji => emoji.name === 'A_');
            const b = message.guild.emojis.cache.find(emoji => emoji.name === 'B_');
            const c = message.guild.emojis.cache.find(emoji => emoji.name === 'C_');
            const d = message.guild.emojis.cache.find(emoji => emoji.name === 'D_');

            const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
            for (let i = 1; i < qna      .length; i++) {
                risposte.push(`:regional_indicator_${alphabet[i - 1]}:  ${qna[i]}`)

            }
            console.log(alphabet[1]);
            embed
                .setTitle(':question: '+ domanda+' :question: ')
                .setDescription(risposte);
            message.channel.send(embed).then(sentEmbed => {
                switch (risposte.length) {
                    case 1:
                        sentEmbed.react(a)
                        break;
                    case 2:
                        sentEmbed.react(a)
                        sentEmbed.react(b)

                        break;
                    case 3:
                        sentEmbed.react(a)
                        sentEmbed.react(b)
                        sentEmbed.react(c)
                        break;
                    case 4:
                        sentEmbed.react(a)
                        sentEmbed.react(b)
                        sentEmbed.react(c)
                        sentEmbed.react(d)
                        break;
                    default: break;

                }
            })

        }
        // client.on('messageReactionAdd', async (reaction, user) => {

        //     if (reaction.partial) {
        //         try {
        //             await reaction.fetch();
        //         } catch (error) {
        //             console.error(error);
        //             return;
        //         }
        //     }
        //     console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
        //     console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
        // });
    }
}
