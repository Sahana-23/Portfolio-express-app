const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const Project = require('../models/projectModel')

router.get('/', (req, res) => {
    res.render('index', {
        layout: "layout",
        title: 'Sahana Hegde | Portfolio'
    })
})

router.get('/projects', asyncHandler(async (req, res) => {
    let projects = await Project.find()

    res.render('projects', {
        layout: "layout",
        title: 'Sahana Hegde | Projects',
        projects
    })
}))

router.get('/projects/:alias', asyncHandler(async (req, res) => {

    let project = await Project.findOne({ alias: req.params.alias })

    res.render('projectDetails', {
        layout: 'layout',
        title: `Project | ${project.name}`,
        project
    })
}))

router.get('/resume', (req, res) => {
    res.redirect('https://portfolio-app-uploads.s3.ap-south-1.amazonaws.com/resume/resume.pdf')
})
module.exports = router;