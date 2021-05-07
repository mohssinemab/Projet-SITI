const Shift = require('../models/Shift');
const Machine = require('../models/Machine');
const mongoose = require('mongoose')


exports.addshift = async (req, res) => {

  try {

    let sh = new Shift({
    operateur: req.user.id,
    machine: req.body.machine,
    produit : req.body.produit });
    
    const s =await sh.save();

    // Update machine -> busy = true 

    const idm = req.body.machine;
    mongoose.set('useFindAndModify', false);
    await Machine.findByIdAndUpdate(idm,{ busy: true },{ new: true })
    .then(data=>{
      if(!data){      
         res.status(404).send("Erreur");       
      }else{
        res.status(200).send(s);
      }
    })   
     
  } catch (err) {
    console.log(err.message);
    res.status(404).send(err.message)}
};
