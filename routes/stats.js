const express = require('express');
const router = express.Router();
const {getcounterbymachine,getcounterbyoperateur,getallbreaksbyoperateur,getallbreaksbymachine,getshiftsbyoperateurbydate,getoperateurstats,getmachineswithnumberofbreaks} = require('../controllers/statsController')



router.post('/getcounterbyoperateur',getcounterbyoperateur);

router.post('/getcounterbymachine',getcounterbymachine);

router.get('/getallbreaksbyoperateur/:id',getallbreaksbyoperateur);

router.get('/getallbreaksbymachine/:id',getallbreaksbymachine);

router.post('/getshiftsbyoperateurbydate',getshiftsbyoperateurbydate);

router.get('/getmachineswithnumberofbreaks',getmachineswithnumberofbreaks);

router.get('/getoperateurstats/:id',getoperateurstats);


module.exports = router;