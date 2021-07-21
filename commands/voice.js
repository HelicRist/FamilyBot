const config = require('../config.json');

module.exports = {
    name: 'voice',
    description: 'Crea stanze vocali temporanee',

    run: async(member, client, action, oldState) => {
        switch (action) {
            case 'create':
                const guild = client.guilds.cache.map(guild => guild);
                let channels = guild[0].channels;
                let channelName = 'room#';

                channels
                    .create(channelName, {
                        type: 'voice',
                    })
                    .then(channel => {
                        channel.setParent(config.tempChannelsCategoryID);
                        member.voice.setChannel(channel);

                        let logVoice = {
                            title: 'Creato canale vocale',
                        }
                    })
                    .catch(console.error);
                break;

            case 'delete':
                if (oldState.channel.name.endsWith('#') && oldState.channel.members.size < 1) {
                    oldState.channel.delete().catch(console.error);
                }
                break;

            default:
                break;
        }
    }
}