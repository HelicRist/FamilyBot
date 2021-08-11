
const TicTacToe = require('discord-tictactoe');

const game = new TicTacToe({ language: 'it' })

module.exports = {
    name: 'tictactoe',
    aliases: ['ttt','tic'],
    description: 'Gioca a TicTacToe',
    category :'fun',
    run: async (client, message, args) => {
        game.handleMessage(message);
    }
}
