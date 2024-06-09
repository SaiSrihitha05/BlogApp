//create express app
const exp = require('express');
const adminApp = exp.Router()

adminApp.get('/test-admin',(req,res)=>{
    res.send({message:"This from admin app"})
})

//export adminApp
module.exports = adminApp;