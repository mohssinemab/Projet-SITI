const express = require('express');

const {addoperateur,getAlloperateur,getoperateurByUsername,deleteoperateur,updateoperateur,getoperateurById} = require('../controllers/operateurController')

const router = express.Router();

router.post('/addoperateur',addoperateur);

router.get('/getAlloperateur', getAlloperateur);



router.get('/getoperateurByUsername/:username', getoperateurByUsername);

router.get('/getoperateurById/:id',getoperateurById);


router.delete('/deleteoperateur/:id',deleteoperateur);

router.patch('/updateoperateur/:id', updateoperateur);

module.exports = router;