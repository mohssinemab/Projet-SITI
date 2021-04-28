
const operateur = require('../models/operateur');
const bcrypt = require('bcrypt');



exports.addoperateur = async (req,res) => {

  const salt = await bcrypt.genSalt(10);

  let pass = req.body.password;
  pass = await bcrypt.hash(pass, salt);

    let op = new operateur({
    username: req.body.username,
    password: pass,
    name: req.body.name,

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