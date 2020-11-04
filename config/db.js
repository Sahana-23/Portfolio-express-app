const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

module.exports.connectDB = asyncHandler(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    console.log("MongoDB connected")
})