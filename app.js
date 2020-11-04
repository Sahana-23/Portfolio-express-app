const express = require('express')
const app = express()
const hbs = require('hbs')
require('dotenv').config()

const middlewares = require('./middlewares/appMiddlewares')
const { connectDB } = require('./config/db')
connectDB()

const indexRoutes = require('./routes/indexRoutes')
const adminRoutes = require('./routes/adminRoutes')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + "/public"))

app.set('views', __dirname + "/views")
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + "/views/partials")

app.use(middlewares.logger)

app.use('/', indexRoutes)
app.use('/admin', adminRoutes)

app.use(middlewares.pageNotFound)

app.use(middlewares.handleError)

app.listen(3000, () => {
    console.log("server running in port 3000")
})