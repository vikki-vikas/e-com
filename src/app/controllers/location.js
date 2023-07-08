const express = require('express')
const locationRouter = express.Router()
const appToken = require('../../utils/jwt-token')
const bcrypt = require("../../utils/bcrypt")
const {Location,City} = require("../../../models")


locationRouter.get('/states' , async (req, res) => {
    try {
        if(req){
            City.findAll({
                attributes:['state_name'],
                group:['state_name']
            }).then(async (states)=>{
                    res.send(states)
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

locationRouter.get('/city/:state' , async (req, res) => {
    try {
        if(req){
            City.findAll({
                where:{
                    state_name : req.params.state
                }
            }).then(async (states)=>{
                    res.send(states)
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


locationRouter.get('/' , async (req, res) => {
    try {
        if(req){

            const locationWhere = req.query.location_id ? {
                id : req.query.location_id
            } : {}

            Location.findAll({
                where : locationWhere
            }).then(async (locations)=>{
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

locationRouter.get('/:id' , async (req, res) => {
    try {
        if(req){
            const location_id = req.params.id
           const productDetails = await Location.findByPk(location_id).then(productDetails => {
                return productDetails
            })
            .catch((err)=>{
                res.status(404).send(err)
            })
            res.json(productDetails)
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

locationRouter.patch('/update/:id' , async (req, res) => {
    try {
        if(req){
            const location_id = req.params.id

           const updatedLocation = await Location.findByPk(location_id).then(LocationDetails => {
                LocationDetails.location_name = req.body.location_name
                LocationDetails.distict = req.body.distict
                LocationDetails.state = req.body.state
                return LocationDetails.save()
            }).catch(err => {
                res.status(401).send(err)
            })
               res.send(updatedLocation)
        }else{
            res.json({"message":"ERROR WHILE CREATING LOCATIONS"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


locationRouter.delete('/delete/:id' , async (req, res) => {
    try {
        if(req){
            const location_id = req.params.id
           const deletedLocation = await Location.destroy(
            {where : {id : location_id}}
            )
           res.json(deletedLocation)   
        }else{
            res.json({"message":"ERROR WHILE DELETEING Location"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = locationRouter