
const r34api = new (require('r34api.js'));
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'rule34',
    description: `Cerca su Rule34.`,
    aliases: ['34', 'r34'],
    usage: ` ${config.prefix}r34 <parametro>`,
    category: 'fun',

    run: async (client, message, args) => {
        let embed = new MessageEmbed()
            .setTitle(":x: Error or empty :x:")
        let data;
        let img;
        let tags;
        let risposta = "Errore :x:";
        //SFW
        if (!message.channel.nsfw) {
            console.log("safe");
            if (!args[0]) {
                data = await r34api.random(1, 'gif');
                img = data.data[0].media
                tags = data.data[0].tags.join(", ")
                risposta = "Roba random per te <3"

            } else {
                data = await r34api.search(args.join(" "));
                if (data.status == 404) {
                    embed
                        .setTitle(data.msg + ":x:")
                        .setDescription(data.data)
                        .setColor("#e7aafa")
                    rispota = "Non ho trovato nulla sry :x:"
                } else {
                    img = data.data.media
                    tags = data.data.tags.join(", ")
                    console.log(img);

                    risposta = `${data.data.rating} ${args.join(" ")} ${data.data.type} `

                }
            }

            message.channel.send(risposta)
            message.channel.send({
                files: [{
                    attachment: img,
                    name: "SPOILER_FILE.jpg"
                }]
            });
            //NSFW
        } else {
            console.log("not safe");
            //Se non viene specificato
            if (!args[0]) {
                data = await r34api.random(1, 'gif');
                img = data.data[0].media
                tags = data.data[0].tags.join(", ")
                console.log(img);
                embed
                    .setTitle(`${data.data[0].rating} ${data.data[0].type} `)
                    .setDescription(data.data[0].post)
                    .setFooter(tags)
                    .setImage(img)
                    .setColor("#e7aafa");
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
                    console.log(img);
                    embed
                        .setTitle(`${data.data.rating} ${args.join(" ")} ${data.data.type} `)
                        .setDescription(data.data.post)
                        .setFooter(tags)
                        .setImage(img)
                        .setColor("#e7aafa");
                    risposta = `${data.data.rating} ${args.join(" ")} ${data.data.type} `

                }
            }

            message.channel.send(embed)
        }

    }
}
