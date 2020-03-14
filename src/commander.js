const discord = require('discord.js')
const covid = require('./commands/covid')

/**
 * @param {discord.Message} message
 * @param {discord.Client} client 
 */
function commander(message, client){
    
    var argv = message.content.split(" ")
    console.log(argv)
    var argc = argv.length
    if(argv[1].toLowerCase()==="help"){
        if(argc===3){
            var manual = manuals.commands.find((manual)=>{
                if(manual.command.toLowerCase()===argv[2]){
                    return manual
                }
            })
            if(!manual){
                message.channel.send(`No command "${argv[2]}"`)
                return
            }
            message.channel.send(`**${manual.command}**\n${manual.usage}\n${manual.description}`)
            return
        }
        var commands = `Avaiable commands:\n`;
        manuals.commands.forEach((manual)=>{
            commands += `**${manual.command}**\nUsage: ${manual.usage}\n`
        })
        message.channel.send(commands)
        return
    }
    if(argv[1].toLowerCase()==="covid"){
        covid(argc, argv, message, client)
        return
    }
    message.channel.send(`Unknown command! Type \"${process.env.COMMAND_PREFIX} help\" to see available commands!`)
    return
}

var manuals = {
    commands:[
        {
            command:`help`,
            usage:`${process.env.COMMAND_PREFIX} help [command]`,
            description:`shows help message for the different commands`,
        },
    ]
}

module.exports = commander