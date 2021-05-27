const express = require('express');

const {addmachine,getAllmachines,getfreemachines,getmachinesbyroom,getmachine} = require('../controllers/machineController')
const {addshift,endshift,getallshifts,getshift,getshiftsByOperateur,getactiveshiftofmachine} = require('../controllers/shiftController')

const router = express.Router();


//Machines
router.post('/addmachine', addmachine);

router.get('/getallmachines', getAllmachines);

router.get('/getmachine/:id', getmachine);

// router.get('/getbusymachines', getbusymachines);

router.get('/getfreemachines', getfreemachines);

router.get('/getmachinesbyroom/:room', getmachinesbyroom);


// Shifts
router.post('/addshift', addshift);

router.get('/getallshifts', getallshifts);

router.get('/getshift/:id', getshift);

router.get('/endshift/:id', endshift);

router.get('/getshiftsByOperateur/:id', getshiftsByOperateur);

router.get('/getactiveshiftofmachine/:id', getactiveshiftofmachine);






module.exports = router;