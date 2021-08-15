
const akaneko = require('akaneko');
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'hentai',
    aliases: ['hanime', 'lewd', 'hanime', 'pic'],
    description: 'Get a nasty pic. Insomma, per farti segare',
    category: 'fun',
    run: async (client, message, args) => {

if(!message.channel.nsfw) return message.channel.send({embed:{description:":x: Usa un canale NSFW", color:"#ec4c4c"}})

        let embed = new MessageEmbed().setColor("#FFDEDE")
        if (args.length > 0) {
            let topic = args[0]
            const f = "ass"

            embed.setTitle(" :lollipop:  " + topic + " :purple_heart:   ")
            switch (topic) {
                case "ass":
                    akaneko.nsfw.ass().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    });
                    break;
                case "bdsm":
                    akaneko.nsfw.bdsm().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "blowjob":
                    akaneko.nsfw.blowjob().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "cum":
                    akaneko.nsfw.cum().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "doujin":
                    akaneko.nsfw.doujin().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "feet":
                    akaneko.nsfw.feet().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "femdom":
                    akaneko.nsfw.femdom().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "foxgirl":
                    akaneko.nsfw.foxgirl().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "gifs":
                    akaneko.nsfw.gifs().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "glasses":
                    akaneko.nsfw.glasses().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "netorare":
                    akaneko.nsfw.netorare().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "maid":
                    akaneko.nsfw.maid().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "masturbation":
                    akaneko.nsfw.masturbation().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "orgy":
                    akaneko.nsfw.orgy().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "panties":
                    akaneko.nsfw.panties().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "pussy":
                    akaneko.nsfw.pussy().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "school":
                    akaneko.nsfw.school().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "succubus":
                    akaneko.nsfw.succubus().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "tentacles":
                    akaneko.nsfw.tentacles().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "thighs":
                    akaneko.nsfw.thighs().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "uglyBastard":
                    akaneko.nsfw.uglyBastard().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "uniform":
                    akaneko.nsfw.uniform().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "yuri":
                    akaneko.nsfw.yuri().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                case "zettaiRyouiki":
                    akaneko.nsfw.zettaiRyouiki().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
                    }); break;
                default:
                    embed.setTitle(" :lollipop:  Hentai :purple_heart:   ")

                    akaneko.nsfw.hentai().then((imageURL) => {
                        embed.setImage(imageURL)
                        message.channel.send(embed)
        
                    })
                break;
            }
        } else {
            embed.setTitle(" :lollipop:  Hentai :purple_heart:   ")

            akaneko.nsfw.hentai().then((imageURL) => {
                embed.setImage(imageURL)
                message.channel.send(embed)

            })
        }



    }
}