const jwt = require('jsonwebtoken');
// const sign = process.env.SIGN;

module.exports = function (req, res, next) {
  //  Getting the token
  const token = req.header('x-auth-token');
console.log(token);
  // Checking if it exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // console.log(" ======== siiiiiign  :",sign);
    const decoded = jwt.verify(token,'Siti');
    console.log("--decodedtoken : ",decoded);
    if(decoded.user.role!=='manager'){
        return res.status(401).json({
            msg:"Sorry, you're not a Manager"
        })
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'token is not valid' });
  }
}