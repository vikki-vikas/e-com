const express = require('express')
const locationRouter = express.Router()
const appToken = require('../../utils/jwt-token')
const bcrypt = require("../../utils/bcrypt")
const {Location} = require("../../../models")


locationRouter.get('/' , async (req, res) => {
    try {
        if(req){
            Location.findAll().then(async (locations)=>{
                    res.send(locations)
            })
            .catch((err)=>{
                res.send(err)
            })
        }else{
            res.json({"message":"ERROR WHILE FETCHING LOCATIONS"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


locationRouter.post('/create' , async (req, res) => {
    try {
        if(req){
            const payload = req.body
             let newLocation = await Location.create(payload).catch((err)=>{
                res.status(401).send(err)
               })
               res.send(newLocation)
        }else{
            res.json({"message":"ERROR WHILE CREATING LOCATIONS"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = locationRouter