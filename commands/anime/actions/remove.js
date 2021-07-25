module.exports = {
    name: 'remove',
    description: 'remove an anime from the list.',
    usage: 'remove <anime name>',

    run: async (message) => {
        message.channel.send(`Sono nel comando **remove**`)
    }
}