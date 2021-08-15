
const TicTacToe = require('discord-tictactoe');
const config = require('../../config.json');
const game = new TicTacToe({ language: 'it' })

module.exports = {
    name: 'tictactoe',
    description: 'Gioca a TicTacToe',
    aliases: ['ttt','tic'],
    usage: `${config.prefix}tictactoe`,
    category :'fun',

    run: async (client, message, args) => {
        game.handleMessage(message);
    }
}
