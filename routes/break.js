const express = require('express');
const {getbreakid,addjustification,endbreak}= require('../controllers/breakController')
const router = express.Router();


router.get('/getbreakid',getbreakid);

router.get('/endbreak/:id',endbreak);

router.patch('/addjustification/:id',addjustification);




module.exports = router;