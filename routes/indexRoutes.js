const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('index', {
        layout: "layout",
        title: 'Sahana Hegde | Portfolio'
    })
})

module.exports = router;