const express = require('express');

const {addmachine,getAllmachines,getbusymachines,getfreemachines,getmachinesbyroom} = require('../controllers/machineController')
const {addshift} = require('../controllers/shiftController')

const router = express.Router();


//Machine
router.post('/addmachine', addmachine);

router.get('/getallmachines', getAllmachines);

router.get('/getbusymachines', getbusymachines);

router.get('/getfreemachines', getfreemachines);

router.get('/getmachinesbyroom/:room', getmachinesbyroom);


// Operation
router.post('/addshift', addshift);






module.exports = router;