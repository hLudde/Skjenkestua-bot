const discord = require('discord.js')
const db = require("../db")
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
    if(argv[2]==="add"){
        if(argc!=4){
            return
        }
        client.channels.fetch(argv[3])
            .then((channel)=>{
                return db.serialize(()=>{
                    db.run("INSERT OR REPLACE INTO channels VALUES (?,?)",[channel.id, "covid"])
                })
            })
            .catch((e)=>{
                console.log(e);
            })
    }
}

module.exports = run