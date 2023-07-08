const express = require('express')
const areaManagerRouter = express.Router()
const {User} = require("./../../../models")
const bcrypt = require("./../../utils/bcrypt")


areaManagerRouter.get('/' , async (req, res) => {
    try {
        if(req){
            User.findAll({
                where: {
                    type: "MANAGER"
                  }
            }).then(async (areaManagerPersons)=>{
                    res.send(areaManagerPersons)
            })
            .catch((err)=>{
                res.send(err)
            })
        }else{
            res.json({"message":"ERROR WHILE FETCHING area manager"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

areaManagerRouter.get('/:id' , async (req, res) => {
    try {
        if(req){
            const areaManager_id = req.params.id
           const areaManagerDetails = await User.findByPk(areaManager_id).then(areaManagerDetails => {
                return areaManagerDetails
            })
            .catch((err)=>{
                res.status(404).send(err)
            })
            res.json(areaManagerDetails)
        }else{
            res.json({"message":"ERROR WHILE FETCHING area manager"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


areaManagerRouter.post('/create' , async (req, res) => {
    try {
        if(req){
            const payload = req.body


            bcrypt.encrypt(req.body.password).then(async (enc_password)=>{

                let newpasswordonj = {
                    ...payload,
                    password : enc_password
                }

                let newareaManager = await User.create(newpasswordonj).catch((err)=>{
                    res.status(401).send(err)
                   })
                   
                   res.send(newareaManager)
            })



        }else{
            res.json({"message":"ERROR WHILE CREATING area manager"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


areaManagerRouter.patch('/update/:id' , async (req, res) => {
    try {
        if(req){
            const areaManager_id = req.params.id
           

            bcrypt.encrypt(req.body.password).then(async (enc_password)=>{

                const updatedAreaManager = await User.findByPk(areaManager_id).then(areaManagerDetails => {

                areaManagerDetails.firstName = req.body.firstName
                areaManagerDetails.LastName = req.body.LastName
                areaManagerDetails.location_id = req.body.location_id
                areaManagerDetails.phone = req.body.phone
                areaManagerDetails.email = req.body.email
                areaManagerDetails.status = req.body.status
                areaManagerDetails.password = enc_password
                return areaManagerDetails.save()

            }).catch(err => {
                res.status(401).send(err)
            })
               res.send(updatedAreaManager)
            })
        }else{
            res.json({"message":"ERROR WHILE updating"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

areaManagerRouter.delete('/delete/:id' , async (req, res) => {
    try {
        if(req){
            const manager_id = req.params.id
           const managerData = await User.destroy(
            {where : {
                id : manager_id,
                type : "MANAGER"
            }}
            )
           res.json(managerData)   
        }else{
            res.json({"message":"ERROR WHILE DELETEING Manager"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})



module.exports = areaManagerRouter