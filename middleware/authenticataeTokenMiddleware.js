require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateTocken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    // if (token == null) {res.redirect('http://127.0.0.1/'); };

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        next()
    });

}

module.exports = {
    authenticateTocken
}