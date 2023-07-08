const express = require('express')
const dashboardRouter = express.Router()
const {Orders,Store,Products,SalesPerson,User,Category,Location, sequelize} = require("../../../models")


dashboardRouter.get('/top-sales-person' , async (req, res) => {
    try {
        if(req){
            const NOW = new Date();

            let locationWhere = req.query.location_id ? {
                location_id : req.query.location_id
            } : {}

            if(req.query.location_id && req.query.manager_id){
                locationWhere = {
                    location_id : req.query.location_id,
                    manager_id : req.query.manager_id
                }
            }

 

            Orders.findAll({ 

                include:[
                //     {
                //         model:Store,
                //         attributes : ['id']
                //     },
                //     {
                //         model:Products,
                //         attributes : ['id']
                //     },
                    {
                        model:SalesPerson,
                        attributes : ['id','firstName','phone']
                    },
                    {
                        model:User,
                        attributes : ['id','firstName','LastName','phone']
                    },
                    {
                        model:Category,
                        attributes : ['id']
                    },
                    {
                        model:Location,
                        attributes : ['id','location_name']
                    }
                ],
                where : locationWhere,
                attributes : [
                   'id',
                   'location_id',
                    'manager_id',
                    [sequelize.fn('count',sequelize.col('sales_person_id')),'count']
                ],
                limit:10,
                group:['sales_person_id'],
                order :[['sales_person_id']]
            }).then(async (ordersList)=>{
                    res.send(ordersList)
            })
            .catch((err)=>{
                res.send(err)
            })
        }else{
            res.json({"message":"ERROR WHILE FETCHING orders"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


dashboardRouter.get('/card-count' , async (req, res) => {
    try {
        if(req){

        

           let deliverdWhere = req.query.location_id ?{
            status : "Deleiverd",
            location_id : req.query.location_id
            } :{
                status : "Deleiverd",
            }


            if(req.query.location_id && req.query.manager_id){
                deliverdWhere = {
                    status : "Deleiverd",
                    location_id : req.query.location_id,
                    manager_id : req.query.manager_id
                    }
            }

            let totalOrderWhere = req.query.location_id ?{
                location_id : req.query.location_id
                } :{}

                if(req.query.location_id && req.query.manager_id){
                    totalOrderWhere = {
                        location_id : req.query.location_id,
                        manager_id : req.query.manager_id
                    }
                }


                let CanceledWhere = req.query.location_id ?{
                    status : "Canceled",
                    location_id : req.query.location_id
                    } :{
                        status : "Canceled",
                    }

                    if(req.query.location_id && req.query.manager_id){
                        CanceledWhere = {
                            status : "Canceled",
                            location_id : req.query.location_id,
                            manager_id : req.query.manager_id
                            }
                    }

                    let storeWhere = req.query.location_id ?{
                        status : "true",
                        location_id : req.query.location_id
                        } :{
                            status : "true",
                        }


        const order_deliverd = await  Orders.findAll({ 
                where:deliverdWhere,
                attributes : [
                   'id',
                    [sequelize.fn('count',sequelize.col('id')),'count']
                ]
            })

            const totla_order = await  Orders.findAll({
                where : totalOrderWhere, 
                attributes : [
                   'id',
                    [sequelize.fn('count',sequelize.col('id')),'count']
                ]
            })

            const Canceled_orders = await  Orders.findAll({ 
                where:CanceledWhere,
                attributes : [
                   'id',
                    [sequelize.fn('count',sequelize.col('id')),'count']
                ]
            })

            const store_count = await  Store.findAll({ 
                where:storeWhere,
                attributes : [
                   'id',
                    [sequelize.fn('count',sequelize.col('id')),'count']
                ]
            })      
                res.json({
                    total_orders : totla_order,
                    orderDeliverd :order_deliverd,
                    canceledOrders : Canceled_orders,
                    store_count : store_count
                })

        }else{
            res.json({"message":"ERROR WHILE FETCHING orders"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


dashboardRouter.get('/sales-card-count/:id' , async (req, res) => {
    try {
        if(req){

        const order_deliverd = await  Orders.findAll({ 
                where:{
                    sales_person_id : req.params.id,
                    status : 'Deleiverd'
                },
                attributes : [
                   'id',
                    [sequelize.fn('count',sequelize.col('id')),'count']
                ]
            })

            const totla_order = await  Orders.findAll({
                where:{
                    sales_person_id : req.params.id,
                },
                attributes : [
                   'id',
                    [sequelize.fn('count',sequelize.col('id')),'count']
                ]
            })

            const Canceled_orders = await  Orders.findAll({ 
                where:{
                    sales_person_id : req.params.id,
                    status : 'Canceled'
                },
                attributes : [
                   'id',
                    [sequelize.fn('count',sequelize.col('id')),'count']
                ]
            })

            const placed_orders = await  Orders.findAll({ 
                where:{
                    sales_person_id : req.params.id,
                    status : 'placed'
                },
                attributes : [
                   'id',
                    [sequelize.fn('count',sequelize.col('id')),'count']
                ]
            })

            const confirmed_orders = await  Orders.findAll({ 
                where:{
                    sales_person_id : req.params.id,
                    status : 'confirmed'
                },
                attributes : [
                   'id',
                    [sequelize.fn('count',sequelize.col('id')),'count']
                ]
            })

                res.json({
                    total_orders : totla_order,
                    orderDeliverd :order_deliverd,
                    canceledOrders : Canceled_orders,
                    placed_orders : placed_orders,
                    confirmed_orders : confirmed_orders
                })

        }else{
            res.json({"message":"ERROR WHILE FETCHING orders"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = dashboardRouter