const Machine = require('../models/Machine');


exports.addmachine = async (req,res) => {
    let mach = new Machine({
    factory: req.body.factory,
    room: req.body.room,
    machine: req.body.machine,    
  });

  Machine.findOne({ factory: mach.factory, room : mach.room, machine : mach.machine}, (err, doc) => {
    if (!err && doc) {
      res.status(404).send("Already exist");
    } else if (!doc) {
      
    try {
    let result =  mach.save();  
    console.log(result);
    res.status(200).send(result)
    }catch (err) {
    console.log(err.message);
    res.status(404).send(err.message)
    }

    } else {
      res.status(404).send(err)
    }
  });

  
};

exports.getmachinesbyroom = async (req, res) => {
  const rm = req.params.room;
  Machine.find({ factory: req.user.factory ,room: rm }, (err, doc) => {
    if (!err && doc) {
      res.send(doc);
    } else if (!doc) {
      res.status(404).send("Not found");
    } else {
      res.status(404).send(err)
    }
  });

};


exports.getAllmachines = async (req,res)=>{
  Machine.find((err,docs)=>{
    if(!err){ res.json(docs)}
    else{
      res.status(404).send(err);
    }
  });
};

exports.getfreemachines = async (req,res)=>{
  Machine.find({busy:false},(err,docs)=>{
    if(!err){ res.json(docs)}
    else{
      res.status(404).send(err);
    }
  });
};

exports.getbusymachines = async (req,res)=>{
  Machine.find({busy:true},(err,docs)=>{
    if(!err){ res.json(docs)}
    else{
      res.status(404).send(err);
    }
  });
};



