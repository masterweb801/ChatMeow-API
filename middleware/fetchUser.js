const jwt = require('jsonwebtoken');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET

module.exports = function fetchUser(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send("Please Authenticate Using A Valid Token");
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send("Please Authenticate Using A Valid Token");
    }
}