const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //  Getting the token
  const token = req.header('x-auth-token');
  // Checking if it exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token,'Siti');
    // console.log("--decodedtoken : ",decoded);
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