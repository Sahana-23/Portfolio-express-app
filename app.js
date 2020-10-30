const express = require('express')
const app = express()
const hbs = require('hbs')

const middlewares = require('./middlewares/appMiddlewares')

app.use(express.static(__dirname + "/public"))
app.set('views', __dirname + "/views")
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + "/views/partials")

app.use(middlewares.logger)

app.get('/', (req, res) => {
    res.render('index', {
        layout: "layout"
    })
})

app.listen(3000, () => {
    console.log("server running in port 3000")
})