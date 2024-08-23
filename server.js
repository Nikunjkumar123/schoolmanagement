const express = require('express')
const app = express()
const router = require('./routes/school.routes.js');
const mySqlPool = require('./config/db.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/',router);

mySqlPool.query('SELECT 1').then(()=>{
    console.log("mySQL DB connected")
    app.listen(3000,()=>console.log("connected to server"))
})
.catch((error)=>console.log(error));