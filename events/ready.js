const config = require('../config.json');
const cron = require('cron');
const akaneko = require('akaneko');
const { MessageEmbed } = require('discord.js');
const subjectID = config.subjectRolesID;

module.exports = {
    name: 'ready',
    description: 'ready event',
    run: async (client) => {
        const Guild = client.guilds.cache.get("666312151354572801");
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

        //DAILY PIC
        let scheduledMessage = new cron.CronJob('00 45 13 * * *', () => {

            const hembed = new MessageEmbed();

            akaneko.nsfw.hentai().then((imageURL) => {

                hembed
                    .setTitle(" :lollipop:  DAILY PIC  :purple_heart: ")
                    .setColor("#FFDEDE")
                    .setImage(imageURL)
                client.channels.cache.get("821068653348913223").send(hembed)

            });

        });
        scheduledMessage.start()

        //MUDAE ADD
        const mudaeID = "432610292342587392";
        const mudaeRoleID = "914873251023429713";
        let mudaeBot = await Guild.members.fetch(mudaeID)
        let mudaeRoleAdd = new cron.CronJob('37 14 * * 1-6', () => {
            mudaeBot.roles.add(mudaeRoleID);
        }, null, true, 'Europe/Rome');
        
        mudaeRoleAdd.start()

        //MUDAE REMOVE
        let mudaeRoleRemove = new cron.CronJob('38 21 * * 0-5', () => {
            mudaeBot.roles.remove(mudaeRoleID);
        }, null, true, 'Europe/Rome');


        mudaeRoleRemove.start()

        config.messagesToCheckReactions.forEach(async object => {
            let message = await client.channels.cache.get(object.channelID).messages.fetch(object.messageID);
            const reactions = ['🐍', '🖥', '📘', '⚔️', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '📈', '🏋️‍♂️', '💶', '👷‍♂️']
            const collector = message.createReactionCollector((reaction, user) => reactions.includes(reaction.emoji.name) && user.id !== client.user.id);

            collector.on('collect', async (reaction, user) => {
                if (user.id === client.user.id) return;
                if (user.bot) return;
                reaction.users.remove(user);

                let member = await Guild.members.fetch(user.id);
                subjectID.forEach(async (id) => {
                    if (member.roles.cache.has(id)) {
                        await member.roles.remove(id)
                    }
                });

                switch (reaction.emoji.name) {
                    case '⚔️':
                        await member.roles.add(subjectID[0]);
                        break;
                    case '🐍':
                        await member.roles.add(subjectID[1]);
                        break;
                    case '📘':
                        await member.roles.add(subjectID[2]);
                        break;
                    case '🖥':
                        await member.roles.add(subjectID[3]);
                        break;
                    case '💶':
                        await member.roles.add(subjectID[4]);
                        break;
                    case '🏴󠁧󠁢󠁥󠁮󠁧󠁿':
                        await member.roles.add(subjectID[5]);
                        break;
                    case '📈':
                        await member.roles.add(subjectID[6]);
                        break;
                    case '🏋️‍♂️':
                        await member.roles.add(subjectID[7]);
                        break;
                    case '👷‍♂️':
                        await member.roles.add(subjectID[8]);
                        break;
                    default:
                        break;
                }
            });
        })
    }
}
