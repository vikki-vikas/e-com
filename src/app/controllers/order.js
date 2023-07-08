const express = require('express')
const ordersRouter = express.Router()
const {Orders,Store,Products,SalesPerson,User,Category,sequelize} = require("./../../../models")


ordersRouter.get('/' , async (req, res) => {
    try {
        if(req){

            const locationWhere = req.query.location_id ? {
                location_id : req.query.location_id,
            } : {}

            const startDate = new Date('2023-02-01'); // Replace with your desired start date
            const endDate = new Date('2023-07-03'); // Replace with your desired end date



            const NOW = new Date();
            // Orders.findAll({ 
            //     include:[
            //         {
            //             model:Store,
            //         },
            //         {
            //             model:Products,
            //         },
            //         {
            //             model:SalesPerson,
            //         },
            //         {
            //             model:User,
            //         },
            //         {
            //             model:Category,
            //         },
            //     ],

            //     // where:locationWhere
            //     // where:{
            //     //     createdAt: {
            //     //         $gt: new Date('2023-02-01')
            //     //     }
            //     // },
            //     // where: {
            //     //     createdAt: {
            //     //       $between: [startDate, endDate],
            //     //     }
            //     // }

            // })
            // .then(async (ordersList)=>{
            //         res.send(ordersList)
            // })
            // .catch((err)=>{
            //     res.send(err)
            // })

            let date = new Date();

            const params =  req.query.location_id ? `and t1.location_id=${req.query.location_id}` : ''
            const managerparams =  req.query.manager_id ? `and t1.manager_id=${req.query.manager_id}` : ''

        const result = await sequelize.query(`SELECT t1.id , t1.quantity , t1.status , t1.createdAt , t1.updatedAt , t2.firstName as sales_first_name , t3.products_name , t4.category_name , t5.location_name , t6.firstName as manager_name , t7.store_name FROM orders as t1
        inner join salespeople as t2 on t1.sales_person_id = t2.id
        INNER JOIN products as t3 on t1.product_id = t3.id
        INNER JOIN categories as t4 on t1.category_id = t4.id
        INNER JOIN locations as t5 on t1.location_id = t5.id
        INNER JOIN users as t6 on t1.manager_id = t6.id AND t6.type = 'MANAGER'
        INNER JOIN stores as t7 on t1.store_id = t7.id
        WHERE date(t1.createdAt)='${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}' ${params} ${managerparams} `,
            { type: sequelize.QueryTypes.SELECT }
            )

            res.send(result)

        }else{
            res.json({"message":"ERROR WHILE FETCHING orders"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

ordersRouter.get('/history' , async (req, res) => {
    try {
        if(req){

            const locationWhere = req.query.location_id ? {
                location_id : req.query.location_id,
            } : {}

        let date = new Date();

        const params =  req.query.location_id ? `and t1.location_id=${req.query.location_id}` : ''
        const managerparams =  req.query.manager_id ? `and t1.manager_id=${req.query.manager_id}` : ''

        let dateparams = req.query.date?`date(t1.createdAt) >='${req.query.date}' and` : ''
        let todateparams = req.query?.todate ?  `t1.createdAt <= "${req.query.todate}"` : `t1.createdAt <= "${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}"`
 
      

        // const dateparams = req.params.date ? ` = ` : '< CURDATE()'

        const result = await sequelize.query(`SELECT t1.id , t1.quantity , t1.status , t1.createdAt , t1.updatedAt , t2.firstName as sales_first_name , t3.products_name , t4.category_name , t5.location_name , t6.firstName as manager_name , t7.store_name FROM orders as t1
        inner join salespeople as t2 on t1.sales_person_id = t2.id
        INNER JOIN products as t3 on t1.product_id = t3.id
        INNER JOIN categories as t4 on t1.category_id = t4.id
        INNER JOIN locations as t5 on t1.location_id = t5.id
        INNER JOIN users as t6 on t1.manager_id = t6.id AND t6.type = 'MANAGER'
        INNER JOIN stores as t7 on t1.store_id = t7.id
        WHERE ${dateparams} ${todateparams} ${params} ${managerparams} order by t1.createdAt desc `,
            { type: sequelize.QueryTypes.SELECT }
            )

            res.send(result)

        }else{
            res.json({"message":"ERROR WHILE FETCHING orders"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

ordersRouter.get('/sales-person-order/:id' , async (req, res) => {
    try {
        if(req){

            const locationWhere = req.query.location_id ? {
                location_id : req.query.location_id,
            } : {}

        const params =  req.query.location_id ? `and t1.location_id=${req.query.location_id}` : ''

        let dateparams = req.query.date?`and date(t1.createdAt)='${req.query.date}'` : ''
 
      

        // const dateparams = req.params.date ? ` = ` : '< CURDATE()'

        const result = await sequelize.query(`SELECT t1.id , t1.quantity , t1.status , t1.createdAt , t1.updatedAt , t2.firstName as sales_first_name , t3.products_name , t4.category_name , t5.location_name , t6.firstName as manager_name , t7.store_name FROM orders as t1
        inner join salespeople as t2 on t1.sales_person_id = t2.id
        INNER JOIN products as t3 on t1.product_id = t3.id
        INNER JOIN categories as t4 on t1.category_id = t4.id
        INNER JOIN locations as t5 on t1.location_id = t5.id
        INNER JOIN users as t6 on t1.manager_id = t6.id AND t6.type = 'MANAGER'
        INNER JOIN stores as t7 on t1.store_id = t7.id
        WHERE t1.sales_person_id = '${req.params.id}' ${dateparams} ${params} `,
            { type: sequelize.QueryTypes.SELECT }
            )

            res.send(result)

        }else{
            res.json({"message":"ERROR WHILE FETCHING orders"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

ordersRouter.get('/bylocation/:id' , async (req, res) => {
    try {
        if(req){
            const NOW = new Date();
            Orders.findAll({ 
                where:{
                    location_id : req.params.id
                },
                include:[
                    {
                        model:Store,
                    },
                    {
                        model:Products,
                    },
                    {
                        model:SalesPerson,
                    },
                    {
                        model:User,
                    },
                    {
                        model:Category,
                    }
                ]
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


ordersRouter.get('/:id' , async (req, res) => {
    try {
        if(req){
            const order_id = req.params.id
           const ordersDetails = await Orders.findByPk(order_id).then(ordersDetails => {
                return ordersDetails
            })
            .catch((err)=>{
                res.status(404).send(err)
            })
            res.json(ordersDetails)
        }else{
            res.json({"message":"ERROR WHILE FETCHING orders"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


ordersRouter.post('/create' , async (req, res) => {
    try {
        if(req){
            const payload = req.body
             let newOrder = await Orders.create(payload).catch((err)=>{
                res.status(401).send(err)
               })
               res.send(newOrder)
        }else{
            res.json({"message":"ERROR WHILE CREATING order"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})


ordersRouter.patch('/updateStatus/:id', async (req, res) => {
    try {
        if(req){
            const order_id = req.params.id

           const updatedOrder = await Orders.findByPk(order_id).then(orderDetails => {

                orderDetails.status = req.body.status
  
                return orderDetails.save()
            }).catch(err => {
                res.status(401).send(err)
            })
               res.send(updatedOrder)
        }else{
            res.json({"message":"ERROR WHILE UPDATING ORDER STATUS"})
        }

    } catch (err) {
        res.status(500).send(err)
    }
})

ordersRouter.get('/top-sales-person' , async (req, res) => {
    try {
        if(req){
            const NOW = new Date();
            Orders.findAll({ 
                include:[
                    {
                        model:Store,
                    },
                    {
                        model:Products,
                    },
                    {
                        model:SalesPerson,
                    },
                    {
                        model:User,
                    },
                    {
                        model:Category,
                    }
                ]
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

module.exports = ordersRouter