const jwt = require('jsonwebtoken')

let authmiddleware = (req, res, next) => {

    let authHeader = req.headers['authorization']

    console.log(authHeader)

    let token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied"
        })
    }

    try {

        let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        console.log(decoded)

        req.user = decoded

        next()

    } catch (e) {

        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token"
        })

    }

}

module.exports = authmiddleware