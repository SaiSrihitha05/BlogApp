const exp = require('express')
const app = exp()
require('dotenv').config() // process
const mongoClient = require('mongodb').MongoClient;
const path = require('path')

//deploy react build in this server
app.use(exp.static(path.join(__dirname,'../client/frontend/build')))

//to parse the body of req
app.use(exp.json())

mongoClient.connect(process.env.DB_URL)
.then(client=>{
    const blogappdb = client.db('blogappdb')
    const usersCollection = blogappdb.collection('usersCollection')
    const articlesCollection = blogappdb.collection('articlesCollection')
    const authorsCollection = blogappdb.collection('authorsCollection')
    app.set('usersCollection',usersCollection)
    app.set('articlesCollection',articlesCollection)
    app.set('authorsCollection',authorsCollection)
    console.log('DB Connection Success')
})
.catch(err=>{
    console.log(err)
})


const userApp = require('./API/user-api')
const authorApp = require('./API/author-api')
const adminApp = require('./API/admin-api')

//if path starts with user-api ,send req to userApp
app.use('/user-api',userApp)
//if path starts with admin-api ,send req to adminApp
app.use('/admin-api',adminApp)
//if path starts with author-api ,send req to authorApp
app.use('/author-api',authorApp)

//for all paths deals with page refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/frontend/build/index.html'))
})

//express error handler
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})

//assign port number
const port = process.env.PORT || 5000;//if port number not specified it takes 5000
app.listen(port,()=>{console.log(`server on port ${port}`)})