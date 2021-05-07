const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //  Getting the token
  const token = req.header('x-auth-token');
  // console.log(token);
  // Checking if it exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // console.log(" ======== siiiiiign  :",process.env.SIGN);
    const decoded = jwt.verify(token,process.env.SIGN);
    // console.log("--decodedtoken : ",decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'token is not valid' });
  }
}