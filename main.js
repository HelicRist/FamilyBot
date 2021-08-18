const discord = require('discord.js');
const config = require('./config.json');
require('colors');
const {  MessageEmbed } = require('discord.js');
require('dotenv').config();
const cron = require('cron');
const client = new discord.Client();
const fs = require('fs');
const akaneko = require('akaneko');
const commandFolders = fs.readdirSync('./commands');

client.commands = new discord.Collection();
for (const folder of commandFolders) {
    const commandFIles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFIles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.events = new discord.Collection();
try {
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        client.events.set(event.name, event);
    }
}
catch (err) {
    console.log((`Il bot ha riscontrato un errore durante l'avvio`).red);
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

client.login(process.env.TOKEN);
