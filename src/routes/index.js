const express = require('express')

// const userrouter = require('../app/controller/user')
const authrouter = require('../app/controllers/auth')
const locationRouter = require('../app/controllers/location')
const storeRouter = require('../app/controllers/store')
const categoryRouter = require('../app/controllers/category')
const productRouter = require('../app/controllers/product')
const salesPersonRouter = require('../app/controllers/salesPerson')
const areaManagerRouter = require('../app/controllers/manager')
const ordersRouter = require('../app/controllers/order')
const dashboardRouter = require('../app/controllers/dashboard')

const appToken = require('./../utils/jwt-token')

const router = express.Router()


router.get('/',(req,res)=>{
    console.log('yes')
    res.send('index')
})

// router.use('/user',checkAuthenticate, userrouter)
router.use('/auth', authrouter)
router.use('/location', appToken.checkAuthenticate, locationRouter)
router.use('/store', appToken.checkAuthenticate, storeRouter)
router.use('/category', appToken.checkAuthenticate, categoryRouter)
router.use('/product', appToken.checkAuthenticate, productRouter)
router.use('/sales-person', appToken.checkAuthenticate, salesPersonRouter)
router.use('/area-manager', appToken.checkAuthenticate, areaManagerRouter)
router.use('/order', appToken.checkAuthenticate, ordersRouter)
router.use('/dashboard', appToken.checkAuthenticate, dashboardRouter)

module.exports = router