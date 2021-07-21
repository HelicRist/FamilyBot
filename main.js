const discord = require('discord.js');
const config = require('./config.json');
const colors = require('colors');
require('dotenv').config();

const client = new discord.Client();
client.commands = new discord.Collection();
const fs = require('fs');

const commandFIles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFIles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.startsWith(config.prefix)) {
        const command = message.content.split(' ')[0].slice(config.prefix.length);
        const args = message.content.split(' ').slice(1);
        const commandObject = client.commands.get(command);
        if (commandObject) {
            commandObject.run(client, message, args);

            let commandEmbed = {
                title: 'Comando richiamato',
                description: `${message.author} => ${command}`,
                fields: [{
                    name: 'Link al messaggio',
                    value: `[Click qui per un viaggio rapido](https://discord.com/channels/666312151354572801/${message.channel.id}/${message.id})`,
                }],
                color: '#154b85',
            }
            client.channels.cache.get(config.commandsLogChannelID).send({ embed: commandEmbed });
        } else {
            message.reply(`:x: Comando ${command} non trovato !`);
        }
    }
})

client.on('voiceStateUpdate', (oldState, newState) => {
    let oldChannel = oldState.channelID;
    let newChannel = newState.channelID;

    let member = newState.member;
    if (newChannel === config.createChannelID) {
        client.commands.get('voice').run(member, client, 'create', oldState);
    }
    client.commands.get('voice').run(member, client, 'delete', oldState);
})

client.on('ready', () => {
    console.log((`Logged in as  ${client.user.tag}. Prefix: ${config.prefix}`).green);

    client.user.setActivity(`${config.prefix}help  `, {
        type: 'STREAMING',
        url: 'https://www.youtube.com/watch?v=5qap5aO4i9A'

    });

})

client.login(process.env.TOKEN);