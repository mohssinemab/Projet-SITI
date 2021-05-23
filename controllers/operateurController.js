const Operateur = require('../models/Operateur');
const bcrypt = require('bcrypt');


exports.addoperateur = async (req, res) => {
  
  const salt = await bcrypt.genSalt(10);

  let pass = req.body.password;
  pass = await bcrypt.hash(pass, salt);
  let p = bcrypt.t

  let op = new Operateur({
    username: req.body.username,
    password: pass,
    name: req.body.name
  });
  try {
    let result = await op.save();
    console.log(result);
    res.status(200).send(result)
  } catch (err) {
    console.log(err.message);
    res.status(404).send(err.message)

  }

};


exports.getAlloperateur = async (req, res) => {
  Operateur.find({ role: "operateur" }, (err, docs) => {
    if (!err) { res.json(docs) }
    else {
      res.status(404).send(err);
    }
  });

};

exports.getoperateurByUsername = async (req, res) => {
  const usern = req.params.username;
  Operateur.findOne({ username: usern }, (err, doc) => {
    if (!err && doc) {
      res.send(doc);
    } else if (!doc) {
      res.status(404).send("Not found");
    } else {
      res.status(404).send(err)
    }
  });

};

exports.getoperateurById = async (req, res) => {
  try {
    const op = await Operateur.findById(req.params.id)
    if (op) {
      res.json(op);
    } else (
      res.status(404).send("Not found")
    )

  } catch (err) {
    res.send(err)
  }

};

exports.updateoperateur = async (req, res) => {

  const salt = await bcrypt.genSalt(10);
  let pass = req.body.password;
  pass = await bcrypt.hash(pass, salt);
  try {
    const id = req.params.id;
    Operateur.findByIdAndUpdate(id, {
      username: req.body.username,
      password: pass,
      name: req.body.name
    }, { new: true })
      .then(data => {
        if (!data) {
          res.status(404).send({
            msg: "Not updated, not found"
          })
        } else {
          res.send({
            msg: "Well updated"
          })
        }
      })

  } catch (err) {
    res.status(404).send(err)
  }
};

exports.deleteoperateur = async (req, res) => {
  const id = req.params.id;
  Operateur.deleteOne({ _id: id }, (err, doc) => {
    if (!err && doc.deletedCount == 1) {
      console.log(doc);
      res.send(" Well deleted ");
    } else {
      console.log(doc);
      res.status(404).send("Delete failed")
      console.log(err)
    }
  });
};
