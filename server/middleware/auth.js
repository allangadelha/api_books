const jwt = require('jsonwebtoken');

const SECRET = 'api_books';

const verifyJWT = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ auth: false });

        req.id = decoded.id;
        next();
    });
}

module.exports = verifyJWT;