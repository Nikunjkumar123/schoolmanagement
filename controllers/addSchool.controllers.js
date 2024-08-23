const db = require('../config/db.js')
const addSchool = async(req,res)=>{
    try {
        const {id,name,address,lattitude,longitude}= req.body;
        if(!id||!name||!address||!lattitude||!longitude){
            return res.status(500).send('error, pls provide all fields')
        }
        const data = await db.query(`INSERT INTO schooldb.school (id,name,address,lattitude,longitude) VALUES(?,?,?,?,?)`,[id,name,address,lattitude,longitude])
        if(!data){
           return res.status(404).send('error occured while inserting in query')
        }
        res.status(200).send('data successfuly created');
    } catch (error) {
        console.log(error);
        res.status(500).send('error occured')
    }
    // res.send('do post ')
}

module.exports = addSchool;