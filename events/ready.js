const config = require('../config.json');
const cron = require('cron');
const akaneko = require('akaneko');
const {  MessageEmbed } = require('discord.js');

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
        let scheduledMessage = new cron.CronJob('00 45 13 * * *', () => {

            const hembed = new MessageEmbed();
            if (r50()) {
                akaneko.neko().then((imageURL) => {
                    console.log(imageURL);
                    hembed
                        .setTitle(" :lollipop:  DAILY PIC  :purple_heart: ")
                        .setColor("#FFDEDE")
                        .setImage(imageURL)
                    client.channels.cache.get("821068653348913223").send({ embed: hembed })
                });

            } else {
                akaneko.foxgirl().then((imageURL) => {

                    console.log(imageURL);
                    hembed
                        .setTitle(" :lollipop:  DAILY PIC  :purple_heart: ")
                        .setColor("#FFDEDE")
                        .setImage(imageURL)
                    client.channels.cache.get("844291548140011540").send({ embed: hembed })
                });
            }

        });

        scheduledMessage.start()

        function r50() {
            return Math.random() < 0.5;
        }
    }
}
