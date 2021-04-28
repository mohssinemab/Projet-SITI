const express = require('express');
const app = express();

const {addoperateur} = require('../controllers/operateurController')
const router = express.Router();

router.post('/addoperateur', addoperateur);

module.exports = router;