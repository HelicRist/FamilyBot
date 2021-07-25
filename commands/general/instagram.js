const axios = require('axios')
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "instagram",
    description: "cerca utente instagram",
    aliases: ['ig'],

    run: async (client, message, args) => {
        if (!args[0]) {
            return message.channel.send(`Serve un nome`)
        }
        let url, response, account, details;
        try {
            url = `https://instagram.com/${args[0]}/?__a=1`;
            console.log(url);
            response = await axios.get(url)
            account = response.data
            details = account.graphql.user
            console.log(account);
        } catch (error) {
            console.log(error);
            return message.channel.send(`Non esite (o molto più probabile sta roba fa schifo)`)
        }

        const embed = new MessageEmbed()
            .setTitle(`${details.is_verified ? `${details.username} <a:verified:727820439497211994>` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `)
            .setDescription(details.biography)
            .setThumbnail(details.profile_pic_url)
            .addFields(
                {
                    name: "Posts:",
                    value: details.edge_owner_to_timeline_media.count.toLocaleString(),
                    inline: true
                },
                {
                    name: "Followers:",
                    value: details.edge_followed_by.count.toLocaleString(),
                    inline: true
                },
                {
                    name: "Following:",
                    value: details.edge_follow.count.toLocaleString(),
                    inline: true
                }
            )
        await message.channel.send(embed)

    }
}