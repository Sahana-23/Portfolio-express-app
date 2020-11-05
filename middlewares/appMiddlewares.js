module.exports.logger = function (req, res, next) {
    console.log(req.method + " " + req.url)
    next()
}

module.exports.pageNotFound = function (req, res, next) {
    res.status(404)
    res.render('errorPage', {
        layout: 'layout',
        status: 'Error 404 Not Found',
        message: 'Sorry, an error has occured, Requested page not found!'
    })
}

module.exports.handleError = function (err, req, res, next) {
    console.log(err)
    res.status(500)
    res.render('errorPage', {
        layout: 'layout',
        status: 'Error 500 Internal Server',
        message: 'Sorry, an error has occured, Please try again later!'
    })
}

module.exports.authenticate = function (req, res, next) {
    if (req.session.isLoggedIn) {
        next()
    } else {
        res.redirect('/admin')
    }
}