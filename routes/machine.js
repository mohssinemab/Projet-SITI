const express = require('express');

const {addmachine,getAllmachine,getusedmachines,getunusedmachines} = require('../controllers/machineController')
const router = express.Router();

router.post('/addmachine', addmachine);

router.get('/getallmachine', getAllmachine);

router.get('/getusedmachines', getusedmachines);

router.get('/getunusedmachines', getunusedmachines);




module.exports = router;