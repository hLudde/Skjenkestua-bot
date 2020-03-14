const discord = require('discord.js')
const commander = require('./commander')

const client = new discord.Client()

client.on("ready", ()=>{
    console.log("Im ready to go!")
    client.user.setActivity({name:`${process.env.COMMAND_PREFIX} help`,})
})

client.on("message", (message)=>{
    if(message.author.bot||message.author.id===client.user.id){
        return
    }
    if(!message.content.startsWith(process.env.COMMAND_PREFIX)){
        return
    }
    commander(message, client)
})

client.login(process.env.CLIENT_TOKEN)

module.exports = client