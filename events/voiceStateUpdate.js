const config = require('../config.json');

module.exports = {
    name: 'voiceStateUpdate',
    description: 'voiceStateUpdate event',
    run: async (client, oldState, newState) => {
        let oldChannel = oldState.channelID;
        let newChannel = newState.channelID;

        let member = newState.member;
        if (newChannel === config.createChannelID) {
            client.commands.get('voice').run(member, client, 'create', oldState);
        }
        client.commands.get('voice').run(member, client, 'delete', oldState);
    }
}