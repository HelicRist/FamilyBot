const discord = require('discord.js');
require('colors');
require('dotenv').config();
const client = new discord.Client();
const fs = require('fs');
const commandFolders = fs.readdirSync('./commands');
//commento prova
client.commands = new discord.Collection();
for (const folder of commandFolders) {
    const commandFIles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFIles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.events = new discord.Collection();
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.events.set(event.name, event);
}

client.on('message', message => {
    client.events.get('message').run(client, message);
})

client.on('voiceStateUpdate', (oldState, newState) => {
    client.events.get('voiceStateUpdate').run(client, oldState, newState);
})

client.on('ready', () => {
    client.events.get('ready').run(client);
});
client.on('messageReactionAdd', (reaction, user) => {
    client.events.get('messageReactionAdd').run(client,reaction,user);

});

client.login(process.env.TOKEN);
