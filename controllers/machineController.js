const Machine = require('../models/Machine');
const Operateur = require('../models/Operateur');
const Shift = require('../models/Shift');


exports.addmachine = async (req, res) => {
  let mach = new Machine({
    factory: req.body.factory,
    room: req.body.room,
    machine: req.body.machine,
  });

  Machine.findOne({ factory: mach.factory, room: mach.room, machine: mach.machine }, async (err, doc) => {
    if (!err && doc) {
      res.status(404).send("Already exist");
    } else if (!doc) {

      try {
        let result = await mach.save();
        const ghost = await Operateur.findOne({role : "ghost"}) ;
        let ghostshift = new Shift ({
          operateur : ghost._id,
          machine :result._id,
          produit : "GHOST"
        });
        const rest = await ghostshift.save();
        console.log(result);
        console.log(rest);

        res.status(200).send(result)
      } catch (err) {
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
  Machine.find({ factory: req.user.factory, room: rm }, (err, doc) => {
    if (!err && doc) {
      res.send(doc);
    } else if (!doc) {
      res.status(404).send("Not found");
    } else {
      res.status(404).send(err)
    }
  });
};


exports.getAllmachines = async (req, res) => {
  if (req.user.role == "manager") {
    Machine.find( (err, docs) => {
      if (!err) { res.json(docs) }
      else {
        res.status(404).send(err);
      }
    });
  } else {
    Machine.find({ factory: req.user.factory }, (err, docs) => {
      if (!err) { res.json(docs) }
      else {
        res.status(404).send(err);
      }
    });
  }
};

exports.getmachine = async (req, res) => {
  try {
    const mach = await Machine.findById(req.params.id)
    if (mach) {
      res.json(mach);
    } else (
      res.status(404).send("Not found")
    )
  } catch (err) {
    res.send(err)
  }
};

exports.getfreemachines = async (req, res) => {
  Machine.find({ busy: false }, (err, docs) => {
    if (!err) { res.json(docs) }
    else {
      res.status(404).send(err);
    }
  });
};

