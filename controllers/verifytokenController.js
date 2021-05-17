const jwt = require('jsonwebtoken');


exports.verifytoken = (req, res) => {

    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SIGN);
        req.user = decoded.user;
        res.status(200).json({ msg: 'token verified' })
    } catch (err) {
        res.status(401).json({ msg: 'token is not valid' });
    }
}