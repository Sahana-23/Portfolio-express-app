const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('admin/sign-in', {
        layout: "layout",
        title: 'Admin | Sign'
    })
})

module.exports = router