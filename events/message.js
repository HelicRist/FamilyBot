const config = require('../config.json');
const PasteClient = require("pastebin-api").default;
const pastebin = new PasteClient(config.pastebinKey);
const fs = require("fs")

module.exports = {
    name: 'message',
    description: 'message event',
    run: async (client, message) => {
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
        let media;

        mediaSaver();

        function mediaSaver() {
            //todo in embed togli testo non del link
            if(message.content.includes("lul")){
            if (message.embeds.length > 0) {
                media = message.content.replace("lul","")
                jsonSave(media)

            }
            else if (message.attachments.size > 0) {
                let Attachment = (message.attachments).array();
                Attachment.forEach(function (attachment) {
                    media = attachment.url
                });

                jsonSave(media)
            }
        }
        };
        function jsonSave(testo) {
            fs.readFile('data/media.json', 'utf-8', (err, data) => {
                if (err) { throw err; }
                let mediaJson = JSON.parse(data)
                mediaJson.data.push(testo)
                fs.writeFile('data/media.json', JSON.stringify(mediaJson), (err) => {
                    if (err) { throw err; }
                });
            });

        }

    }
}