const operation = require('../models/operation');


exports.addoperation = async (req, res) => {

  let op = new operation({
    operateur: req.body.operateur,
    machines: req.body.machines

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