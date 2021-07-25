

module.exports = {
    name: "admin",
    aliases: ["admin"],
    description: "Mod teporaneo, non abusarne",
    category: "moderation",
    run: async (client, message, args) => {
        console.log("fa");
        const e1 = message.guild.emojis.cache.find(emoji => emoji.name === 'go');
        const e2 = message.guild.emojis.cache.find(emoji => emoji.name === 'fu');
        const e3 = message.guild.emojis.cache.find(emoji => emoji.name === 'ck');
        const e4 = message.guild.emojis.cache.find(emoji => emoji.name === 'ur');
        const e5 = message.guild.emojis.cache.find(emoji => emoji.name === 'se');
        const e6 = message.guild.emojis.cache.find(emoji => emoji.name === 'lf');
        message.react(e1);
        message.react(e2);
        message.react(e3);
        message.react(e4);
        message.react(e5);
        message.react(e6);

    }
}