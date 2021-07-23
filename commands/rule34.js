
const rule34 = require('rule34')
const r34api = new (require('r34api.js'));
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'rule34',
    aliases: ['34','r34'],
    description: 'Cerca su Rule34',

    run: async (client, message, args) => {
        let embed = new MessageEmbed()
            .setTitle(":x: Error or empty :x:")
        let data;
        let img;
        let tags;
        //Se non viene specificato
        if (!args[0]) {
            data = await r34api.random(1, 'gif');
            console.log(data.data[0].media);
            img = data.data[0].media
            tags = data.data[0].tags.join(", ")
            embed
                .setTitle(`${data.data[0].rating} ${data.data[0].type} `)
                .setDescription(data.data[0].post)
                .setFooter(tags)
                .setImage(img)
                .setColor("#e7aafa")
        }
        else {
            data = await r34api.search(args.join(" "));
            if (data.status == 404) {
                embed
                    .setTitle(data.msg + ":x:")
                    .setDescription(data.data)
                    .setColor("#e7aafa")
            } else {
                img = data.data.media
                tags = data.data.tags.join(", ")
                console.log(data);
                embed
                    .setTitle(`${data.data.rating} ${args.join(" ")} ${data.data.type} `)
                    .setDescription(data.data.post)
                    .setFooter(tags)
                    .setImage(img)
                    .setColor("#e7aafa")
            }
        }
        message.channel.send(embed)


    }
}