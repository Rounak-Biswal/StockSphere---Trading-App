const jwt = require("jsonwebtoken")

//this middleware if passed with any route, makes it a protected route
const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) return res.status(401).json({ error: "Token not found" })

    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return res.json({ error: "Unauthorized" })


        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userPayload = decoded
        next()
    } catch (err) {
        console.log(err)
        res.json({ error: "Invalid token" })
    }
}

//function to generate JWT token
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 1800 })
}

module.exports = { jwtAuthMiddleware, generateToken }