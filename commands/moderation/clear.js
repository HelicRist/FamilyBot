const config = require('../../config.json');

module.exports = {
    name: "clear",
    description: `cancella messaggi`,
    aliases: ["pulisci"],
    usage: `${config.prefix}clear <num_mex>`,
    category: "moderation",
    
    run: async (client, message, args) => {
    const amount = args.join(' '); 
    let id = message.member.id;
    if ( id == "342343548718284801" ) {
        if (!amount) return message.reply('Specifica quanti messaggi eliminare'); 
        if (isNaN(amount)) return message.reply('Devi mettere un numero'); 

        if (amount > 100) return message.reply('Woo più di 100 son troppi'); 
        if (amount < 1) return message.reply('Deve essere almeno 1'); 

        
        await message.delete();

        message.channel.bulkDelete(amount).then(() => {
            message.channel.send("**Stealth!**")
            .then(message => {
                message.delete({ timeout: 1000 });
            });
        });
    } else {
        const embed = new MessageEmbed()
            .setTitle(':x: Error')
            .setColor(0xff0000)
            .setDescription('Non puoi ');
            message.channel.send(embed);    }

    }
}