const express = require('express')
const bodyparser = require('body-parser')
const approuter = require('./src/routes')
const app = express()
const mysql = require("mysql2")
const db = require("./models")
var cors = require('cors')


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cors())

app.use('/assets/Images',express.static('./assets/Images'))

app.use(bodyparser.json())

app.use(approuter)

db.sequelize.sync().then((res)=>{
    app.listen(3000,()=>{
        console.log('listining in 3000')
    })
})
