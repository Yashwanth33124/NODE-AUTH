const mongoose = require('mongoose')

const connectTOdb = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI)

        console.log("Database connected successfully")

    } catch (e) {

        console.log("Database connection failed")
        console.log(e) 

        process.exit(1)
    }
}

module.exports = connectTOdb