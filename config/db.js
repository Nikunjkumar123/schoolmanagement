const mysql = require('mysql2/promise.js');
const mySqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'schooldb'
})

module.exports =  mySqlPool;
