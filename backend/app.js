//importing important modules
const cors = require('cors')
const jwt = require('jsonwebtoken')
const jwtKey = require('./secrateCode')
const authenticator = require('./check_auth')
//creating an express app
const express = require("express")
var app = express()

//middlewares
app.use(cors())
app.use(express.json())

//creating a Mongodb Client
const mongoClient = require("mongodb").MongoClient
//connecting with mongodb database
const url = 'mongodb://0.0.0.0:27017'
const dbName = 'Pizzeria'
var db,collection
mongoClient.connect(url, {useUnifiedTopology : true},(err, client)=>{
    if(err){
        console.log(err)
    } else{
        console.log("Connected to database")
        db = client.db(dbName)
        return db
    }
})

app.get('/',(req,res)=>{
    res.send('connected')
})
app.get("/contact",(req,res)=>{
    res.send('contacts')
})
app.get('/orderplaced',(req,res)=>{
    res.send('orderplaced')
})


//register new user
app.post('/register',(req,res)=>{
    console.log(req.body)
    let userEmail = req.body.email
    let userName = req.body.name
    let userPassword = req.body.password
    db.collection('users').findOne({email:userEmail}, (err,result)=>{
        if(err){
            console.log(err)
        }else if(result){
            res.send({status:'duplicate',message:"user already exist"})
        }else{
            db.collection('users').insertOne({email:userEmail, name:userName, password:userPassword}, (err)=>{
                if(err) console.log(err)
                res.send({status:'ok',message:'user registered'})
            })
        }
    })
    
})

//login user
app.post('/login',(req,res)=>{
    let userEmail = req.body.email
    let userPassword = req.body.password
    db.collection('users').findOne({email:userEmail, password:userPassword}, (err,result)=>{
        if(err){
            console.log(err)
        }else if(!result){
            res.send({status:'invalid',message:"Invalid Credential"})
        }else{
            const token = jwt.sign(
                { email: result.email, userId: result._id, },
                jwtKey,
                { expiresIn: "1h" });
                res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: result._id
              });
        }
    })
})

//using authenticator middleware
app.use(authenticator)

//sending pizza data
app.get('/pizzaDetails',(req,res)=>{
    collection = db.collection('Pizzas')
    collection.find({}).toArray((err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
})

//sending ingredients data
app.get('/ingredients',(req,res)=>{
    collection = db.collection('Ingredients')
    collection.find({}).toArray((err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
})




//add item to shopping cart
app.post('/addtocart', (req,res)=>{
    let pizzaId = req.body.pizzaid
    let pizzaName = req.body.pizzaname
    let pizzaPrice = req.body.price
    let pizzaImage = req.body.pizzaimage
    let userId = req.userData.userId
    console.log(userId)
    let pizzaQty = 1
    collection = db.collection('shoppingcart')
    collection.findOne({userid:userId, pizzaid:pizzaId}, (err,result)=>{ //finding if the same type pizza is already on cart
        if(err){
            console.log(err)
        }else if(!result){//no same-type pizza found
            collection.insertOne({userid:userId, pizzaid:pizzaId, pizzaname:pizzaName, pizzaimage:pizzaImage, price:pizzaPrice, qty:pizzaQty}, (err)=>{
                if(err) console.log(err)
                res.send({status:'ok',message:'Pizza added to cart'})
            })
        }else{
            pizzaQty += result.qty //same pizza already in the cart 
            collection.updateOne({userid:userId, pizzaid:pizzaId},{$set:{ qty:pizzaQty}}, (err)=>{
                if(err) console.log(err)
                res.send({status:'ok',message:'Pizza added to cart'})
            })
        }
    })
    
})

//decrease the qty of pizza
app.post('/reducepizza', (req,res)=>{
    let pizzaId = req.body.pizzaid
    let userId = req.userData.userId
    console.log(userId)
    collection = db.collection('shoppingcart')
    collection.findOne({userid:userId, pizzaid:pizzaId}, (err,result)=>{ //finding if the pizza on the cart
        if(err){
            console.log(err)
        }else if(!result){//no same-type pizza found
            res.send({message:"Something went wrong"})
        }else{//pizza in the cart 
            pizzaQty = result.qty - 1 
            collection.updateOne({userid:userId, pizzaid:pizzaId},{$set:{ qty:pizzaQty}}, (err)=>{
                if(err) console.log(err)
                res.send({status:'ok',message:'Pizza number decreased'})
            })
        }
    })
    
})

//fetch all shopping cart data
app.get('/shoppingcart', (req,res)=>{
    userId = req.userData.userId
    collection = db.collection('shoppingcart')
    collection.find({userid:userId}).toArray((err,result)=>{
        if(err){
            console.log(err)
            res.send("Something went wrong")
        }else{
            res.json(result)
        }
    })
})









//remove a pizza from cart
app.post('/removepizza',(req,res)=>{
    userId = req.userData.userId
    pizzaId = req.body.pizzaid
    
    collection = db.collection('shoppingcart')
    collection.remove({userid: userId,pizzaid:pizzaId},(err)=>{
        if(err) console.log(err)
        res.send({status:'ok', message:'Pizza removed'})
    })
})

//initiating serever port
const port = 4000
app.listen(port,(err)=>{
    if(err) console.log(err)
    console.log("server is listening at port 4000")
})



app.get('/checkout', (req,res)=>{
    userId = req.userData.userId
    collection = db.collection('shoppingcart')
    collection.find({userid:userId}).toArray((err,result)=>{
        if(err){
            console.log(err)
            res.send("Something went wrong")
        }else{
            console.log("order details:"+result)
            result.forEach(pizza => {
                const {_id,userid,pizzaid,pizzaname,pizzaimage,price,qty}=pizza;
                db.collection('Orders').insertOne({_id,userid,pizzaid,pizzaname,pizzaimage,price,qty},(err)=>{
                    if(err) console.log('error in order insert: '+err);
                    // console.log("pizza inserted");
                })
            });
           
            collection.deleteMany({userid:userId},(err)=>{
                if(err) console.log(err)
                console.log("deleted in cart");
            })
        }
    })
})




