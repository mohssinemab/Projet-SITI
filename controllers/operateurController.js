
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


exports.getAlloperateur = async (req,res)=>{
  operateur.find((err,docs)=>{
    if(!err){ res.json(docs)}
    else{
      res.status(404).send(err);
    }
  });
};

exports.getoperateurByUsername= async (req,res)=>{
  const usern = req.params.username;
  operateur.findOne({username : usern},(err,doc)=>{
    if(!err && doc){
      res.send(doc);
    }else if(!doc){
      res.status(404).send("Not found");
    }else{
      res.status(404).send(err)
    }
  });
  
};

// exports.Updateoperateur

exports.deleteoperateur = async (req,res)=>{
  const usern = req.params.username;
  operateur.deleteOne({username : usern},(err,doc)=>{
    if(!err && doc.deletedCount==1 ){
      console.log(doc);
      res.send(" Well deleted ");
    }else{
      console.log(doc);
      res.status(404).send("Delete failed")
      console.log(err)
    }
  });
};

