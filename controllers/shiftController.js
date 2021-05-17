const Shift = require('../models/Shift');
const Machine = require('../models/Machine');
const mongoose = require('mongoose')


exports.addshift = async (req, res) => {

  try {

    let sh = new Shift({
      operateur: req.user.id,
      machine: req.body.machine,
      produit: req.body.produit
    });

    Machine.findById(sh.machine, async (err, doc) => {
      if (!doc) {
        res.status(404).send("Machine not found : ", err);
      } else {
        if (doc.busy == true) {
          res.status(400).send("Machine already in use")
        } else {
          mongoose.set('useFindAndModify', false);
          await Machine.findByIdAndUpdate(sh.machine, { busy: true }, { new: true })
            .then(async data => {
              if (!data) {
                res.status(404).send("Erreur");
              } else {
                const s = await sh.save();
                res.status(200).send(s)
              }
            })

        }
      }
    })

  } catch (err) {
    console.log(err.message);
    res.status(404).send(err.message)
  }
};

exports.endshift = async (req, res) => {
  mongoose.set('useFindAndModify', false);

  try {
    const id = req.params.id;
    mongoose.set('useFindAndModify', false);
    Shift.findByIdAndUpdate(id, { datefin: Date.now() }, { new: true })
      .then(async data => {
        if (!data) {
          res.status(404).send({
            msg: "Not ended, not found"
          })
        } else {
          mongoose.set('useFindAndModify', false);
          await Machine.findByIdAndUpdate(data.machine, { busy: false }, (err, doc) => {
            if (err) {
              res.status(400).send("machine not updated")
            }
            else {
              res.send({
                msg: "Well ended"
              })
            }
          })
        }
      })

  } catch (err) {
    res.status(400).send(err)
  }
};

exports.getallshifts = async (req, res) => {
      Shift.find().populate('operateur').populate('machine').then((data) =>{ res.send(data)})
};  

exports.getshift = async (req, res) => {
  try {
    const sh = await Shift.findById(req.params.id).populate('operateur').populate('machine')
    if (sh) {
      res.json(sh);
    } else (
      res.status(404).send("Not found")
    )
  } catch (err) {
    res.send(err)
  }

};