const operateur = require("../models/operateur")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


exports.login = (req, res) => {
  const usern = req.body.username;
  const password = req.body.password;
  operateur.findOne({ username : usern })
    .then(user => {
      console.log(user);
      if (user) {
        console.log(password);
        bcrypt.compare(password, user.password)
          .then(result => {
            console.log(result);
            if (result) {
              const token = jwt.sign({
                user: {
                  username: user.username,
                  name: user.name,
                  role: user.role
                }
              },
              process.env.SIGN,
                { expiresIn: 10000 });
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

