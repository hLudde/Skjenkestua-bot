const discord = require('discord.js')
/**
 * 
 * @param {int} argc 
 * @param {string[]} argv 
 * @param {discord.Message} message 
 * @param {discord.Client} client 
 */
function run(argc, argv, message, client){
    if(message.author.id!=process.env.ADMIN){
        message.channel.send(`You do not have permission to run this command.`)
        return
    }
    if(argc<3){
        return
    }
    return
}

module.exports = run