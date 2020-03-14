const discord = require('discord.js')
const client = require("../client")
const db = require("../db")
const https = require('https');

var covidStatus = {}
var channels = []
var dataSource = "https://www.vg.no/spesial/2020/corona-viruset/data/norway-table-overview/?region=county"
var msg;
function fetchData(url){
    https.get(url, (resp) => {
        let data = '';
      
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', async () => {
            covidStatus = JSON.parse(data);
          var embed = new discord.MessageEmbed()
            .setColor("#000000")
            .setTitle("Covid-19 Live")
            .setDescription("Status smittede i Norge")
            .addField("Totalt", covidStatus.totals.confirmed)
            .addField("Friske", covidStatus.totals.recovered)
            .addField("Døde", covidStatus.totals.dead)
            .setTimestamp()
            if(!msg){
                msg = await client.channels.cache.get("688464522163257423").send(embed)
            }
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
}

/*function updateChannels(){
    db.all("SELECT id FROM channels WHERE context='covid'",(err, rows)=>{
        if(err){
            return;
        }
        
    })
}*/

/*function parseData(){
    return {
        name:""
    }
    covidStatus
}*/
setTimeout(()=>{
    fetchData(dataSource)
},5000)
setInterval(()=>{
    fetchData(dataSource)
    var embed = new discord.MessageEmbed()
        .setColor("#000000")
        .setTitle("Covid-19 Live")
        .setDescription("Status smittede i Norge")
        .addField("Totalt", covidStatus.totals.confirmed)
        .addField("Friske", covidStatus.totals.recovered)
        .addField("Døde", covidStatus.totals.dead)
        .setTimestamp()
    msg.edit(embed)
    //client.channels.cache.get("688464522163257423").send(embed)
},60000)