const config = require('../config.json');
const cron = require('cron');
const akaneko = require('akaneko');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageReactionAdd',
    description: 'messageReactionAdd event',
    run: async (client,reaction, user) => {
        function controlloMaterie() {
            let role;
            if (reaction.emoji.name === "⚔️" && !user.bot) {
                const Member = client.guilds.cache.get("666312151354572801").members.cache.get(user.id);
                role = Member.guild.roles.cache.find(role => role.name === "storia");
                Member.roles.add(role);
                console.log("storia");
            }
            if (reaction.emoji.name === "🐍" && !user.bot) {}
            if (reaction.emoji.name === "🖥" && !user.bot) {}
            if (reaction.emoji.name === "📘" && !user.bot) {}
            if (reaction.emoji.name === "📈" && !user.bot) {}
            if (reaction.emoji.name === "📈" && !user.bot) {}
            if (reaction.emoji.name === "🏋️‍♂️" && !user.bot) {}
            if (reaction.emoji.name === "💶" && !user.bot) {}
            if (reaction.emoji.name === "👷‍♂️" && !user.bot) {}

        };


        controlloMaterie();
    }
}

