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
        console.log("--- pass hashed from DB : ",user.password);
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
                "Siti",
                { expiresIn: 36000 });
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




// exports.register = (req, res) => {
  
//   Admin.findOne({ username: req.body.username })
//     .then(result => {
//       if (result) {
//         return res.status(400).json({ error: "this is user already exist" })
//       }
//       else{
       
//         const cabinet = new Cabinet({
//             type: req.body.type,
//             typeAr: req.body.typeAr,
//             adresse: req.body.adresse,
//             adresseAr: req.body.adresseAr,
//             fax: req.body.fax,
//           })
//         cabinet.save()
//           .then((cabinet)=>{
//             const personne = new Admin({
//               username: req.body.username,
//               password: req.body.password,
//               nomComplet: req.body.nomComplet,
//             })
//             personne.save((err, personne) => {
//               if(err) {
//                   return res.status(400).send(err)
//               }
//               // res.send(personne)
//               Admin.findById({ _id: personne._id }).populate('cabinet')
//               .then(data => res.json(data))
//            })
//           })
        
//       }
//     })

// }