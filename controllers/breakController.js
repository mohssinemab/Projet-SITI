const Break = require ('../models/Break')
const Shift = require('../models/Shift');

exports.getbreakid = async (req,res)=>{
    const sh_id= req.body.shift_id;
    const index = req.body.index;
    console.log("shift id : ", sh_id);
    console.log("index : ", index);

    try {
    let sh = await Shift.findById(sh_id);
    if (sh) {
        if(index>sh.breaks.length){
            res.status(400).send(" Index is bigger than breaks array's length")
        }
        let break_id = sh.breaks[index];
        console.log("Break id : ",break_id);
        res.send({
            "break id" : break_id
        })
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
    const id = req.params.id;
    Break.findByIdAndUpdate(id, {
      justification: req.body.justification
    })
      .then(data => {
        if (!data) {
          res.status(404).send({
            msg: "Justification not updated, Break not found"
          })
        } else {
          res.send({
            msg: "Justification well updated"
          })
        }
      })

  } catch (err) {
    res.status(400).send(err)
  }

}

exports.endbreak = async (req,res)=>{

    try {
        const id = req.params.id;
        Break.findByIdAndUpdate(id, {
          breakend: Date.now()
        })
          .then(data => {
            if (!data) {
              res.status(404).send({
                msg: "Date breakend not updated, Break not found"
              })
            } else {
              res.send({
                msg: "Date breakend well updated"
              })
            }
          })
        
    
      } catch (err) {
        res.status(400).send(err)
      }
    
}