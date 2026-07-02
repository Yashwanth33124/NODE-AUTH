let express = require('express')
let authMiddleware = require('../middleware/auth-middleware')
let router = express.Router()

router.get('/welcome',authMiddleware, (req, res) => {
    res.json({
        message: "Welcome to the homepage"
    })
})

module.exports = router