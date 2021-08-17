const discord = require('discord.js');
const config = require('./config.json');
require('colors');
const {  MessageEmbed } = require('discord.js');
require('dotenv').config();
const cron = require('cron');
const client = new discord.Client();
client.commands = new discord.Collection();
const fs = require('fs');
const akaneko = require('akaneko');
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFIles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFIles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.startsWith(config.prefix)) {
        const command = message.content.split(' ')[0].slice(config.prefix.length);
        const args = message.content.split(' ').slice(1);
        const commandObject = client.commands.get(command)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
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
//
           let scheduledMessage = new cron.CronJob('20 44 22 * * *', () => {

         const hembed = new MessageEmbed();
           if(r50()){
            akaneko.neko().then((imageURL) => {
                console.log(imageURL);
                hembed
                    .setTitle(" :lollipop:  DAILY PIC  :purple_heart: ")
                    .setColor("#FFDEDE")
                    .setImage(imageURL)
                client.channels.cache.get("821068653348913223").send(hembed)
            });

        }else{
            akaneko.foxgirl().then((imageURL) => {
                
                console.log(imageURL);
                hembed
                    .setTitle(" :lollipop:  DAILY PIC  :purple_heart: ")
                    .setColor("#FFDEDE")
                    .setImage(imageURL)
                client.channels.cache.get("844291548140011540").send("↓↓ @here ↓↓")
                client.channels.cache.get("844291548140011540").send(hembed)
                });
        }

    });
              
          scheduledMessage.start()          

          function r50(){
              return Math.random() < 0.5;
            }
});

client.login(process.env.TOKEN);
