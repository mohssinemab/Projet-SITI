const express = require('express');

const {addmachine,getAllmachine,getusedmachines,getunusedmachines} = require('../controllers/machineController')
const {addoperation} = require('../controllers/operationController')

const router = express.Router();


//Machine
router.post('/addmachine', addmachine);

router.get('/getallmachine', getAllmachine);

router.get('/getusedmachines', getusedmachines);

router.get('/getunusedmachines', getunusedmachines);

// Operation
router.post('/addoperation', addoperation);





module.exports = router;