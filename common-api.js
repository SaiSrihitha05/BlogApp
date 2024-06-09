//login,register
const exp = require('express')
const commonApp = exp.Router()


commonApp.get('/common',(req,res)=>{
    res.send({message:"this is from common app"})
})




module.exports = commonApp