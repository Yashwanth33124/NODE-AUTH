
let express = require('express')
let { registerUser, loginUser } = require('../controllers/auth-controller')
let router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)

module.exports = router
