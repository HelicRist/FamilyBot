const config = require('../config.json');
const cron = require('cron');
const akaneko = require('akaneko');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageReactionAdd',
    description: 'messageReactionAdd event',
    run: async (client, reaction, user) => {
        if (reaction.emoji.id == 912609751513309206) {
            let args = reaction.message.content.split(' ')
            console.log(args);
            let link = (config.googleItLink).replace('sentence', args.join('%20'))
            reaction.message.channel.send(link);
        }
    }
}
