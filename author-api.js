//create author app
const exp = require('express')
const bcryptjs = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const verifyToken = require('../Middlewares/verifyToken')

require('dotenv').config()

const authorApp = exp.Router()

let authorsCollection;
let articlesCollection;
//get authorsCollection app
authorApp.use((req,res,next)=>{
    articlesCollection = req.app.get("articlesCollection")
    authorsCollection = req.app.get('authorsCollection')
    next()
})

//adding new article by author
authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    const newArticle = req.body
    console.log(newArticle)
    await articlesCollection.insertOne(newArticle)
    res.send({message:"Article Created"})
}))

//modify article 
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    const modifiedArticle = req.body
    let result = await articlesCollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    console.log(result)
    let latestArticle = await articlesCollection.findOne({articleId:modifiedArticle.articleId})
    res.send({message:"Article Modified",article:latestArticle})
}))


authorApp.get('/articles', expressAsyncHandler(async (req, res) => {
    const articlesCollection = req.app.get('articlesCollection'); // Accessing articlesCollection from middleware
    let articles = await articlesCollection.find().toArray(); // Using find() to get all documents in the collection
    res.send({ message: "This from user app", payload: articles });
}))

//delete article by it's id
authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    const articleIdFromUrl = (+req.params.articleId);
    const articleToDelete = req.body;
    console.log(articleToDelete.status)
    if(articleToDelete.status === true){
        let modifiedArt = await articlesCollection.findOneAndUpdate({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
        res.send({message:"Article Deleted",payload:modifiedArt.status})
    }

    if(articleToDelete.status === false){
        let modifiedArt = await articlesCollection.findOneAndUpdate({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
        res.send({message:"Article Restored",payload:modifiedArt.status})
    }
}))

authorApp.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    const authorName = req.params.username
    let allArticles = await articlesCollection.find({username:authorName}).toArray()
    res.send({message:"All Articles",payload:allArticles})
}))


authorApp.post('/user',expressAsyncHandler(async(req,res)=>{

    const newUser = req.body
    const dbUser = await authorsCollection.findOne({username:newUser.username})
    if(dbUser!==null){
        res.send({message:"User Existed"})
    }else{
        const hashedPass = await bcryptjs.hash(newUser.password,6)
        newUser.password = hashedPass
        await authorsCollection.insertOne(newUser)
        res.send({message:"User Created"})
    }
}))

authorApp.post('/login', expressAsyncHandler(async (req, res) => {
    const userCred = req.body;
    console.log('Received login request:', userCred);

    const dbUser = await authorsCollection.findOne({ username: userCred.username });
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

authorApp.get('/test-author',(req,res)=>{
    res.send({message:"This from author app"})
})

//export authorApp
module.exports = authorApp;