const Operateur = require("../models/Operateur")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


exports.login = (req, res) => {
  const usern = req.body.username;
  const password = req.body.password;
  Operateur.findOne({ username : usern })
    .then(user => {
      // console.log(user);
      if (user) {
        // console.log(password);
        bcrypt.compare(password, user.password)
          .then(result => {
            console.log(result);
            if (result) {
              const token = jwt.sign({
                user: {
                  id : user._id,
                  username: user.username,
                  factory: user.factory,
                  name: user.name,
                  role: user.role
                }
              },
              process.env.SIGN,
                { expiresIn: 100000 });
              return res.status(200).json({
                message: "login success",
                token: token
              });
            } else {
              return res.status(401).json({
                erreur: "password incorrect"
              });
            }
          })
        
      } else {
        return res.status(404).json({ erreur: "No Account Found" });
      }
    });
}

