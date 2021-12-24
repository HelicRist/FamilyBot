const config = require('../../config.json');

module.exports = {
    name: 'roll',
    description: 'Roll a dice',
    aliases: ['rolla'],
    usage: `${config.prefix}roll dNumber+modifier`,
    category: 'fun',

    run: async (client, message, args) => {

        
        let diceSides, modifier, roll, result,all = 0
        modifier = 0
        all = args[0].split("+");
        diceSides = all[0]
        if (isNaN(diceSides) || diceSides < 1) return message.reply(":x: Inserisci un dado valido pirla :x:")
        diceSides = parseInt(diceSides)
        if (all.length > 1) {
            if (isNaN(all[1])) return message.reply(":x: Inserisci un modificatore valido pirla :x:")
            modifier = parseInt(all[1])
        }
        roll= Math.floor(Math.random() * diceSides) + 1 
        result = roll + modifier

        let title,description = "";
        let color = "#cc8c54"
        if (modifier!=0){ title='Hai rollato un D'+diceSides+"+"+modifier }else{ title='Hai rollato un D'+diceSides}
        description = `ed è uscito un **${result}**!`
        if(roll ===diceSides){
            description = `**CRITICO POSITIVO**\n${diceSides} naturale! `
            color = "#00ff00"
        }else if (roll ==1){
            description = `**CRITICO NEGATIVO**\n È uscito **1** `
            color = "#ff0000"
        }
 
        let rollEmbed = {
            title: title,
            description: description,
            color: color,
            thumbnail: { url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Froleplay-and-tabletop-dice-glyph%2F430%2F9_glyph-512.png&f=1&nofb=1" },

        };

        message.channel.send({ embed: rollEmbed });

    }
}