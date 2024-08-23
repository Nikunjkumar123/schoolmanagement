const express = require('express')
const router = express()
const addSchool = require('../controllers/addSchool.controllers.js');
const showALLSchool = require('../controllers/showALLSchool.controllers.js');

router.post('/addSchool',addSchool)
router.get('/listSchools',showALLSchool)
module.exports = router;