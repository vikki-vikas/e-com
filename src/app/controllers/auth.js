const express = require('express')
const authrouter = express.Router()
const appToken = require('../../utils/jwt-token')
const bcrypt = require("./../../utils/bcrypt")
const {User,Location} = require("./../../../models")
const {SalesPerson} = require("./../../../models")


authrouter.post('/login' , async (req, res) => {

    try {
        if(req){
            User.findAll({where:{
                Emailid : req.body.email
            }}).then(async (user)=>{
                const locationdetails = ''
                if(user.length > 0){
                    
                   
                    // if(user[0].location_id){
                    //     locationdetails = await Location.findAll({
                    //         where:{
                    //             id : parseInt(user[0].location_id)
                    //         }
                    //     })
                    // }


                    const passwordmached = await bcrypt.compare(req.body.password,user[0].password)



                    if(passwordmached){
                        const usertoken =  await appToken.getToken( JSON.stringify(user[0]));
                        res.send({
                            userId : user[0].id,
                            email : user[0].Emailid,
                            firstName : user[0].firstName,
                            LastName : user[0].LastName,
                            role : user[0].type,
                            location : user[0].location_id,
                            // locationDetails : locationdetails,
                            token : usertoken
                        })
                    }else{
                        res.status(404).send({message:'user not found'})
                    }
                }else{
                    res.status(404).json({
                        message : 'user not found'
                    })
                }
            })
            .catch((err)=>{
                res.send(err)
            })
        }else{
            res.json('message:"Invalid User Credentials"')
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


authrouter.post('/sales-person/login' , async (req, res) => {

    try {
        if(req){
            SalesPerson.findAll({where:{
                email : req.body.email
            }}).then(async (user)=>{

                if(user.length > 0){
                    
                    const passwordmached = await bcrypt.compare(req.body.password,user[0].password)
                    if(passwordmached){
                        const usertoken =  await appToken.getToken( JSON.stringify(user[0]));
                        res.send({
                            user_id : user[0].id,
                            email : user[0].email,
                            firstName : user[0].firstName,
                            lastName : user[0].lastName,
                            location_id : user[0].location_id,
                            areaManager_id : user[0].areaManager_id,
                            token : usertoken
                        })
                    }else{
                        res.status(404).send({message:'user not found'})
                    }
                }else{
                    res.status(404).json({
                        message : 'user not found'
                    })
                }
            })
            .catch((err)=>{
                res.send(err)
            })
        }else{
            res.json('message:"Invalid User Credentials"')
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


authrouter.post('/signup' , async (req, res) => {
    try {
        if(req){

           bcrypt.encrypt(req.body.password).then(async (enc_password)=>{
            const payload = {
                firstName : req.body.name,
                LastName : req.body.lastname,
                Emailid : req.body.email,
                password : enc_password,
                type : req.body.type,

                location_id : req.body.location_id?req.body.location_id:'',
                phone : req.body.phone?req.body.phone:'',
                description : req.body.description?req.body.description:'',

                status : req.body.status
                }
             let newuser = await User.create(payload).catch((err)=>{
                res.status(401).send(err)
               })
               res.send(newuser)
           })
        }else{
            res.json('message:"Invalid User Credentials"')
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = authrouter