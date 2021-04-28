const express = require('express');

const {addmachine} = require('../controllers/machineController')
const router = express.Router();

router.post('/addmachine', addmachine);

module.exports = router;