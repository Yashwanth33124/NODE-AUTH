let User = require('../models/user')
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')

let registerUser = async (req, res) => {
    try {
        let { username, email, password, role } = req.body
        let checkExist = await User.findOne({ $or: [{ username }, { email }] })
        if (checkExist) {
            return res.status(400).json({
                success: false,
                message: "user already exist"
            })
        }

        let salt = await bcrypt.genSalt(10)
        let hashedpassword = await bcrypt.hash(password, salt)

        let newlycreatedpass = new User({
            username,
            email,
            password: hashedpassword,
            role: role || 'user'
        })

        await newlycreatedpass.save()
        if (newlycreatedpass) {
            res.status(201).json({
                success: true,
                message: "User register successfully ",
            })
        } else {
            res.status(400).json({
                success: false,
                message: " Unable to register ",
            })
        }

    } catch (e) {
        console.log(e)
        res.status(505).json({
            success: false,
            message: " some error occured"
        })
    }
}
let loginUser = async (req, res) => {
    try {
        let { username, password } = req.body

        let user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        let ispassword = await bcrypt.compare(password, user.password)

        if (!ispassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        let accessToken = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET_KEY, {
            expiresIn: '15m'
        }
        )

        res.status(200).json({
            success:true,
            message:"Logged in successfully",
            accessToken
        })


    } catch (e) {
        console.log(e)
        res.status(505).json({
            success: false,
            message: " some error occured"
        })
    }
}


module.exports = { registerUser, loginUser }