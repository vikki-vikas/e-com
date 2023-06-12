const express = require('express')

// const userrouter = require('../app/controller/user')
const authrouter = require('../app/controllers/auth')
const locationRouter = require('../app/controllers/location')
const appToken = require('./../utils/jwt-token')

const router = express.Router()


router.get('/',(req,res)=>{
    console.log('yes')
    res.send('index')
})

// router.use('/user',checkAuthenticate, userrouter)
router.use('/auth', authrouter)
router.use('/location', appToken.checkAuthenticate, locationRouter)

module.exports = router