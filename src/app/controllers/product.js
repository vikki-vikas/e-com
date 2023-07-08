const express = require('express')
const productRouter = express.Router()
const {Products,Category} = require("../../../models")
const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'./assets/Images')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})


productRouter.get('/' , async (req, res) => {
    try {
        if(req){
            Products.findAll({
                include:[
                    {
                        model:Category,
                        attributes:['category_name']
                    },
                   
                ]
            }).then(async (Products)=>{
                    res.send(Products)
            })
            .catch((err)=>{
                res.send(err)
            })
        }else{
            res.json({"message":"ERROR WHILE FETCHING Products"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

productRouter.get('/bycategory/:id' , async (req, res) => {
    try {
        if(req){
            Products.findAll({
                where : {
                    category_id : req.params.id
                }
            }).then(async (Products)=>{
                    res.send(Products)
            })
            .catch((err)=>{
                res.send(err)
            })
        }else{
            res.json({"message":"ERROR WHILE FETCHING Products"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

productRouter.get('/:id' , async (req, res) => {
    try {
        if(req){
            const product_id = req.params.id
           const productDetails = await Products.findByPk(product_id).then(productDetails => {
                return productDetails
            })
            .catch((err)=>{
                res.status(404).send(err)
            })
            res.json(productDetails)
        }else{
            res.json({"message":"ERROR WHILE FETCHING Products"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})



productRouter.post('/create' , upload.single('image') , async (req, res) => {
    try {
        if(req){
            const payload = req.body
             let newProducts = await Products.create({
                image : req.file.path,
                ...payload}).catch((err)=>{
                res.status(401).send(err)
               })
               res.send(newProducts)
        }else{
            res.json({"message":"ERROR WHILE CREATING Products"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


productRouter.patch('/update/:id', upload.single('image') , async (req, res) => {
    try {
        if(req){
            const product_id = req.params.id
           const updatedProduct = await Products.findByPk(product_id).then(productDetails => {
                productDetails.products_name = req.body.products_name
                productDetails.image = req.file.path
                productDetails.category_id = req.body.category_id
                productDetails.price = req.body.price
                productDetails.description = req.body.description
                productDetails.status = req.body.status
  
                return productDetails.save()
            }).catch(err => {
                res.status(401).send(err)
            })
               res.send(updatedProduct)
        }else{
            res.json({"message":"ERROR WHILE CREATING Products"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

productRouter.delete('/delete/:id' , async (req, res) => {
    try {
        if(req){
            const product_id = req.params.id
           const productData = await Products.destroy(
            {where : {
                id : product_id
            }}
            )
           res.json(productData)   
        }else{
            res.json({"message":"ERROR WHILE DELETEING Product"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = productRouter