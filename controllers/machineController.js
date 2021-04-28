const machine = require('../models/machine');


exports.addmachine = async (req,res) => {
    let mach = new machine({
    factory: req.body.factory,
    row: req.body.row,
    machine: req.body.machine,
    used:req.body.used
    
  });

  try {
    let result = await mach.save();
    console.log(result);
    res.status(200).send(result)
  } catch (err) {
    console.log(err.message);
    res.status(404).send(err.message)

    }

};