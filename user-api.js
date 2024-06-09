//create userApp
const exp = require('express')
const bcryptjs = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const verifyToken = require('../Middlewares/verifyToken')
require('dotenv').config()

const userApp = exp.Router()

//const commonApp = require('./common-api')

let usersCollection;
let articlesCollection;
//get usersCollection app
userApp.use((req,res,next)=>{
    usersCollection = req.app.get('usersCollection')
    articlesCollection = req.app.get('articlesCollection')
    next()
})


userApp.get('/articles',verifyToken, expressAsyncHandler(async (req, res) => {
    const articlesCollection = req.app.get('articlesCollection'); // Accessing articlesCollection from middleware
    let articles = await articlesCollection.find({status:true}).toArray(); // Using find() to get all documents in the collection
    res.send({ message: "This from user app", payload: articles });
}))



userApp.post('/user',expressAsyncHandler(async(req,res)=>{

    const newUser = req.body
    const dbUser = await usersCollection.findOne({username:newUser.username})
    if(dbUser!==null){
        res.send({message:"User Existed"})
    }else{
        const hashedPass = await bcryptjs.hash(newUser.password,6)
        newUser.password = hashedPass
        await usersCollection.insertOne(newUser)
        res.send({message:"User Created"})
    }
}))

userApp.post('/login', expressAsyncHandler(async (req, res) => {
    const userCred = req.body;
    console.log('Received login request:', userCred);

    const dbUser = await usersCollection.findOne({ username: userCred.username });
    console.log('Database User:', dbUser);

    if (dbUser === null) {
        console.log('Invalid Username');
        res.status(401).send({ "message": "Invalid Username" });
    } else {
        try {
            const status = await bcryptjs.compare(userCred.password, dbUser.password);
            console.log('Bcrypt Comparison Result:', status);

            if (status === false) {
                console.log('Invalid Password');
                res.status(401).send({ "message": "Invalid Password" });
            } else {
                const signedToken = jwt.sign({ "username": dbUser.username }, process.env.SECRET_KEY, { expiresIn: '1d' });
                console.log('Login success');
                res.send({ "message": "login success", token: signedToken, user: dbUser });
            }
        } catch (error) {
            console.error('Error during password comparison:', error);
            res.status(500).send({ "message": "Internal Server Error" });
        }
    }
}));


userApp.post('/comment/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    const userComment = req.body
    const articleId = (+req.params.articleId)
    console.log(userComment)
    let result = await articlesCollection.updateOne({articleId:articleId},{$addToSet:{comments:userComment}})
    console.log(result)
    res.send({message:"Comment Added"})
}))


//export user app
module.exports = userApp;