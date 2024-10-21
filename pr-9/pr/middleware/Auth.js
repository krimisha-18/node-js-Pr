const jwt = require('jsonwebtoken')

const veryfyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).send({
        success: false,
        message: "Blank token"
    });
    newtoken = token.slice(7)

    jwt.verify(newtoken, "secret-key", (err, user) => {

        if (err) return res.status(403).send({
            success: false,
            message: "Invalid token"
        });
        req.user = user;
        next();
    })
}

module.exports = {
    veryfyToken
}