const express = require('express')
const storeRouter = express.Router()
const appToken = require('../../utils/jwt-token')
const bcrypt = require("../../utils/bcrypt")
const {Store,Location,SalesPerson} = require("../../../models")


storeRouter.get('/' , async (req, res) => {
    try {
        if(req){

            const locationWhere = req.query.location_id ? {
                location_id : req.query.location_id
            } : {}

            Store.findAll({
                include:[
                    {
                        model:Location,
                    },
                    {
                        model:SalesPerson,
                    }
                ],
                where : locationWhere
            }).then(async (Stores)=>{
                    res.send(Stores)
            })
            .catch((err)=>{
                res.send(err)
            })
        }else{
            res.json({"message":"ERROR WHILE FETCHING Store"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

storeRouter.get('/bylocation/:id' , async (req, res) => {
    try {
        if(req){
            Store.findAll({
                include:[
                    {
                        model:Location,
                    },
                    {
                        model:SalesPerson,
                    }
                ],
                where:{
                    location_id : req.params.id
                }
            }).then(async (Stores)=>{
                    res.send(Stores)
            })
            .catch((err)=>{
                res.send(err)
            })
        }else{
            res.json({"message":"ERROR WHILE FETCHING Store"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

storeRouter.get('/:id' , async (req, res) => {
    try {
        if(req){
            const store_id = req.params.id
           const storeDetails = await Store.findByPk(store_id).then(storeDetails => {
                return storeDetails
            })
            .catch((err)=>{
                res.status(404).send(err)
            })
            res.json(storeDetails)
        }else{
            res.json({"message":"ERROR WHILE FETCHING Store"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


storeRouter.post('/create' , async (req, res) => {
    try {
        if(req){
            const payload = req.body
             let newStore = await Store.create(payload).catch((err)=>{
                res.status(401).send(err)
               })
               res.send(newStore)
        }else{
            res.json({"message":"ERROR WHILE CREATING Store"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


storeRouter.patch('/update/:id' , async (req, res) => {
    try {
        if(req){
            const store_id = req.params.id
           const updatedStore = await Store.findByPk(store_id).then(StoreDetails => {
                StoreDetails.store_name = req.body.store_name
                StoreDetails.location_id = req.body.location_id
                StoreDetails.store_owner_name = req.body.store_owner_name
                StoreDetails.store_owner_phone = req.body.store_owner_phone
                StoreDetails.store_owner_email = req.body.store_owner_email
                StoreDetails.sales_person_id = req.body.sales_person_id
                StoreDetails.status = req.body.status
                return StoreDetails.save()
            }).catch(err => {
                res.status(401).send(err)
            })
               res.send(updatedStore)
        }else{
            res.json({"message":"ERROR WHILE CREATING LOCATIONS"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


storeRouter.delete('/delete/:id' , async (req, res) => {
    try {
        if(req){
            const store_id = req.params.id
           const storeData = await Store.destroy(
            {where : {
                id : store_id
            }}
            )
           res.json(storeData)   
        }else{
            res.json({"message":"ERROR WHILE DELETEING Store"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})



module.exports = storeRouter