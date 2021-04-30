const express = require('express');
const app = express();

const {addoperateur,getAlloperateur,getoperateurByUsername,deleteoperateur,updateoperateur} = require('../controllers/operateurController')
const router = express.Router();

router.post('/addoperateur', addoperateur);

router.get('/getAlloperateur', getAlloperateur);

router.get('/getoperateurByUsername/:username', getoperateurByUsername);

router.delete('/deleteoperateur/:username', deleteoperateur);

// router.put('/updateoperateur/:username', updateoperateur);

module.exports = router;