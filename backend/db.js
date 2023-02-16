//creating a Mongodb Client
const mongoClient = require("mongodb").MongoClient
//connecting with mongodb database
const url = 'mongodb://0.0.0.0:27017'
const dbName = 'Pizzeria'
var db
async function client (){
    mongoClient.connect(url, {useUnifiedTopology : true},(err, client)=>{
        if(err){
            console.log(err)
        } else{
            console.log("Connected to database")
            db = client.db(dbName)
            return db
            // collection = db.collection('pizza')
        }
    })
}
module.exports=client
