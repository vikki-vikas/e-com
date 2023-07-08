const express = require('express')
const categoryRouter = express.Router()
const {Category} = require("../../../models")

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



categoryRouter.get('/' , async (req, res) => {
    try {
        if(req){
            Category.findAll().then(async (Categorys)=>{
                    res.send(Categorys)
            })
            .catch((err)=>{
                res.send(err)
            })
        }else{
            res.json({"message":"ERROR WHILE FETCHING Category"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

categoryRouter.get('/:id' , async (req, res) => {
    try {
        if(req){
            const category_id = req.params.id
           const categoryDetails = await Category.findByPk(category_id).then(categoryDetails => {
                return categoryDetails
            })
            .catch((err)=>{
                res.status(404).send(err)
            })
            res.json(categoryDetails)
        }else{
            res.json({"message":"ERROR WHILE FETCHING Store"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


categoryRouter.post('/create' ,upload.single('image'), async (req, res) => {
    try {
        if(req){
            const payload = req.body
             let newCategory = await Category.create({
                image:req.file.path,
                ...payload}).catch((err)=>{
                res.status(401).send(err)
               })
               res.send(newCategory)
        }else{
            res.json({"message":"ERROR WHILE CREATING Category"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

categoryRouter.patch('/update/:id' , upload.single('image') , async (req, res) => {
    try {
        if(req){
            const category_id = req.params.id
           const updatedCategory = await Category.findByPk(category_id).then(categoryDetails => {
                categoryDetails.category_name = req.body.category_name
                categoryDetails.image = req.file.path
                categoryDetails.status = req.body.status
  
                return categoryDetails.save()
            }).catch(err => {
                res.status(401).send(err)
            })
               res.send(updatedCategory)
        }else{
            res.json({"message":"ERROR WHILE CREATING LOCATIONS"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


categoryRouter.delete('/delete/:id' , async (req, res) => {
    try {
        if(req){
            const category_id = req.params.id
           const deletedCategory = await Category.destroy(
            {where : {id : category_id}}
            )
           res.json(deletedCategory)   
        }else{
            res.json({"message":"ERROR WHILE DELETEING CATEGORY"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = categoryRouter