
require('dotenv').config()
let express = require('express')
let connectTOdb = require('./database/db')
let authRoutes = require('./routes/auth-routes')
let homeRoute = require('./routes/home-routes')
connectTOdb()
let app = express()
PORT = process.env.PORT || 3000
app.use(express.json())
app.use('/api/auth',authRoutes)
app.use('/api/home',homeRoute)

app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`)
})