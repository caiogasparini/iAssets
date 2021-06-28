const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('authorization');
    if(!token) return res.status(401).json('você não está logado!');

    try {
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
        //console.log(userVerified)
        req.user = userVerified;
        next();
    } catch (error) {
        res.status(401).json('Você não está logado!');
    }
}