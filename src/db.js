var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('sqlite3.db',(err)=>{
    if(!err){
        console.log("Successfully connected to DB!")
        return
    }
    console.log(err)
    throw new Error(err);
});

process.on("exit", ()=>{
    console.log("closing db...")
    db.close()
})

db.serialize(()=>{
    db.run("CREATE TABLE IF NOT EXISTS channels (id TEXT UNIQUE, context TEXT UNIQUE)")
})

module.exports = db