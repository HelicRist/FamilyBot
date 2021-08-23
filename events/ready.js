const config = require('../config.json');
const cron = require('cron');
const akaneko = require('akaneko');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ready',
    description: 'ready event',
    run: async (client) => {
        const botStatus = [
            `${config.prefix}help`,
            `with depression`,
            `with fake happiness`
        ]
        console.log((`Logged in as  ${client.user.tag}. Prefix: ${config.prefix}`).green);

        setInterval(function () {
            let status = botStatus[Math.floor(Math.random() * botStatus.length)];
            client.user.setActivity(status, { type: "STREAMING", url: 'https://www.twitch.tv/relaxbeats' });

        }, 5000)
        //
        let scheduledMessage = new cron.CronJob('00 45 14 * * *', () => {

            const hembed = new MessageEmbed();

            akaneko.nsfw.hentai().then((imageURL) => {

                console.log(imageURL);
                message.channel.send("↓↓ @here ↓↓").then(() => {
                    hembed
                        .setTitle(" :lollipop:  DAILY PIC  :purple_heart: ")
                        .setColor("#FFDEDE")
                        .setImage(imageURL)
                    client.channels.cache.get("821068653348913223").send(hembed)
                })
            });

        });

        scheduledMessage.start()

    }
}
