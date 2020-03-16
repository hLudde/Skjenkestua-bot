const discord = require("discord.js")
const client = require("../client")
const bent = require("bent")

const getJson = bent("json")
var dataSource = process.env.DATA_SOURCE

var covidStatus = {
    "totals": {
        "confirmed": 0,
        "dead": 0,
        "recovered": 0,
        "changes": {
            "newToday": 0,
            "newYesterday": 0,
            "diff": 0,
            "deathsToday": 0,
            "deathsYesterday": 0
        }
    },
    "cases":[
        {
            "confirmed": 0,
            "dead": 0,
            "recovered": 0,
            "name": "",
            "countyCode": "",
            "confirmedPer1kCapita": 0
        },
    ],
    "updated": {
        "ts": "",
        "by": "",
        "version": ""
    }
}
var baseEmbed = {
    "title": "Covid-19 Live",
    "description": "Status smittede i Norge",
    
    "color": 0x0,
    "timestamp": "2020-03-16T16:02:18.984Z",
    "thumbnail": {
      "url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "fields": [
      {
        "name": "Totaler",
        "value": "Totalt: 0\nFriske: 0\nDøde: 0",
        "inline": true
      },
      {
        "name": "Idag",
        "value": "Nye: 0\nDøde: 0",
        "inline": true
      }
    ],
    timestamp: null,
}

async function fetchData(url){
    let obj = await getJson(url)
        .then((response) =>{
            return response
        })
        .catch((err)=>{
            console.error(`Unable to fetch json from: ${dataSource}.\n${err}`)
            return null
        })
    return obj
}

/**
 * @param {covidStatus} obj 
 */
function updateMessage(obj){
    client.channels.fetch(process.env.COVID_CHANNEL_ID)
        .then((channel)=>{return channel.messages.fetch(process.env.COVID_MESSAGE_ID)})
        .then((message)=>{return message.edit({embed: obj})})
        .catch((err)=>{console.error(err)})
}
/**
 * @param {covidStatus} obj 
 */
function convertStatusToEmbed(obj){
    var embed = baseEmbed
    embed.thumbnail.url = `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}`
    embed.fields[0].value=`Totalt: ${obj.totals.confirmed}\nFriske: ${obj.totals.recovered}\nDøde: ${obj.totals.dead}`
    embed.fields[1].value=`Nye: ${obj.totals.changes.newToday}\nDøde: ${obj.totals.changes.deathsToday}`
    embed.timestamp = new Date()
    return embed
}


async function updateStatus(){
    var data = await fetchData(dataSource)
    if(!data){
        return
    }
    covidStatus = data
    return
}

setInterval(async ()=>{
    await updateStatus()
    var embed = convertStatusToEmbed(covidStatus)
    updateMessage(embed)
},60000)