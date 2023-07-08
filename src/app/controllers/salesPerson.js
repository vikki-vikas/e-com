const express = require('express')
const salesPersonRouter = express.Router()
const {SalesPerson} = require("../../../models")
const bcrypt = require("./../../utils/bcrypt")


salesPersonRouter.get('/' , async (req, res) => {
    try {
        if(req){

            const locationWhere = req.query.location_id ? {
                location_id : req.query.location_id
            } : {}
            
            SalesPerson.findAll({
                where : locationWhere
            }).then(async (SalesPersons)=>{
                    res.send(SalesPersons)
            })
            .catch((err)=>{
                res.send(err)
            })
        }else{
            res.json({"message":"ERROR WHILE FETCHING SalesPerson"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

salesPersonRouter.get('/fromuser/:id' , async (req, res) => {
    try {
        if(req){

            const locationWhere = req.query.location_id ? {
                location_id : req.query.location_id,
                areaManager_id : req.params.id
            } : {}
            
            SalesPerson.findAll({
                where : locationWhere
            }).then(async (SalesPersons)=>{
                    res.send(SalesPersons)
            })
            .catch((err)=>{
                res.send(err)
            })
        }else{
            res.json({"message":"ERROR WHILE FETCHING SalesPerson"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

salesPersonRouter.get('/bylocation/:id' , async (req, res) => {
    try {
        if(req){
            SalesPerson.findAll({
                where : {
                    location_id : req.params.id
                }
            }).then(async (SalesPersons)=>{
                    res.send(SalesPersons)
            })
            .catch((err)=>{
                res.send(err)
            })
        }else{
            res.json({"message":"ERROR WHILE FETCHING SalesPerson"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

salesPersonRouter.get('/:id' , async (req, res) => {
    try {
        if(req){
            const salesPerson_id = req.params.id
           const salesPersonDetails = await SalesPerson.findByPk(salesPerson_id).then(salesPersonDetails => {
                return salesPersonDetails
            })
            .catch((err)=>{
                res.status(404).send(err)
            })
            res.json(salesPersonDetails)
        }else{
            res.json({"message":"ERROR WHILE FETCHING SalesPerson"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


salesPersonRouter.post('/create' , async (req, res) => {
    try {
        if(req){
            const payload = req.body

            bcrypt.encrypt(req.body.password).then(async (enc_password)=>{
                
                let newSalesPerson = await SalesPerson.create({
                    ...payload,
                    online:true,
                    password:enc_password
                }).catch((err)=>{
                    res.status(401).send(err)
                   })
                   res.send(newSalesPerson)
            })

        }else{
            res.json({"message":"ERROR WHILE CREATING SalesPerson"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


salesPersonRouter.patch('/update/:id' , async (req, res) => {
    try {
        if(req){
            const salesPerson_id = req.params.id

            bcrypt.encrypt(req.body.password).then(async (enc_password)=>{


                const updatedSalesPerson = await SalesPerson.findByPk(salesPerson_id).then(salesPersonDetails => {
                    salesPersonDetails.firstName = req.body.firstName
                    salesPersonDetails.lastName = req.body.lastName
                    salesPersonDetails.location_id = req.body.location_id
                    salesPersonDetails.areaManager_id = req.body.areaManager_id
                    salesPersonDetails.phone = req.body.phone
                    salesPersonDetails.email = req.body.email
                    salesPersonDetails.password = enc_password
                    salesPersonDetails.status = req.body.status
      
                    return salesPersonDetails.save()
                }).catch(err => {
                    res.status(401).send(err)
                })
                   res.send(updatedSalesPerson)

            })
        }else{
            res.json({"message":"ERROR WHILE CREATING Products"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

salesPersonRouter.patch('/updateProfile/:id' , async (req, res) => {
    try {
        if(req){
            const salesPerson_id = req.params.id

   

                const updatedSalesPerson = await SalesPerson.findByPk(salesPerson_id).then(salesPersonDetails => {
                    // salesPersonDetails.firstName = req.body.firstName
                    // salesPersonDetails.lastName = req.body.lastName
                    // salesPersonDetails.phone = req.body.phone
                    // salesPersonDetails.email = req.body.email
                    salesPersonDetails.location = req.body.location
                    salesPersonDetails.online = req.body.online
      
                    return salesPersonDetails.save()
                }).catch(err => {
                    res.status(401).send(err)
                })
                   res.send(updatedSalesPerson)

            
        }else{
            res.json({"message":"ERROR WHILE CREATING Products"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

salesPersonRouter.delete('/delete/:id' , async (req, res) => {
    try {
        if(req){
            const sales_person_id = req.params.id
           const salesPersonData = await SalesPerson.destroy(
            {where : {
                id : sales_person_id
            }}
            )
           res.json(salesPersonData)   
        }else{
            res.json({"message":"ERROR WHILE DELETEING Sales Person"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = salesPersonRouter