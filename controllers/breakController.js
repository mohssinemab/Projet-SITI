const Break = require ('../models/Break')
const Shift = require('../models/Shift');
const mongoose = require('mongoose')


exports.getbreakid = async (req,res)=>{
    
    const sh_id= req.body.shift_id;
    const index = req.body.index;
    console.log("shift id : ", sh_id);
    console.log("index : ", index);
    mongoose.set('useFindAndModify', false);

    try {
    let sh = await Shift.findById(sh_id).populate('breaks');
    if (sh) {
        if(index>sh.breaks.length){
            res.status(400).send(" Index is bigger than breaks array's length")
        }
        let br = sh.breaks[index];
        console.log("Break id : ",br);
        res.send(br)
      } else (
        res.status(404).send("Shift not found")
      )

    } catch (err) {
    res.status(400).send({
        "Erreur" : err
    })
  }
} 



exports.addjustification = async (req,res)=>{

  try {
    mongoose.set('useFindAndModify', false);

    const id = req.params.id;
    Break.findByIdAndUpdate(id, {
      justification: req.body.justification
    },{ returnOriginal: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            msg: "Justification not updated, Break not found"
          })
        } else {
          res.send(data)
        }
      })

  } catch (err) {
    res.status(400).send(err)
  }

}

exports.endbreak = async (req,res)=>{

    try {
        mongoose.set('useFindAndModify', false);
        const id = req.params.id;
        const br = await Break.findById(id);
        if(!br.breakend){

        
        Break.findByIdAndUpdate(id, {
          breakend: Date.now()
        },{ returnOriginal: false })
          .then(data => {
            if (!data) {
              res.status(404).send({
                msg: "Date breakend not updated, Break not found"
              })
            } else {
              res.send(data)
            }
          })
        
        }else{
            res.status(400).send("Already ended")
        }
    
      } catch (err) {
        res.status(400).send(err)
      }
    
}