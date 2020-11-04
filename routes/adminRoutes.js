const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const uploadRoutes = require('./uploadRoutes')

const User = require('../models/userModel')
const Project = require('../models/projectModel')

router.route('/')
    .get((req, res) => {
        res.render('admin/sign-in', {
            layout: "layout",
            title: 'Admin | Sign'
        })
    })
    .post(asyncHandler(async (req, res) => {
        var user = await User.findOne({ email: req.body.email, password: req.body.password })
        if (user) {
            res.redirect('admin/projects')
        } else {
            res.render('admin/sign-in', {
                layout: "layout",
                title: 'Admin | Sign',
                message: "Invalid Email/Password"
            })
        }
    }))

router.get('/projects', asyncHandler(async (req, res) => {
    let projects = await Project.find()
    if (projects) {
        res.render('admin/projectList', {
            layout: "layout",
            title: 'Admin | Projects',
            projects: projects
        })
    } else {
        res.status(500)
        throw new Error('Invalid User Data')
    }
}))

router.route('/projects/newProject')
    .get((req, res) => {
        res.render('admin/newProject', {
            layout: "layout",
            title: 'Admin | New Project'
        })
    })
    .post(asyncHandler(async (req, res) => {
        req.body.alias = req.body.name.split(' ').join('-').toLowerCase();

        let projectDoc = new Project(req.body);
        await projectDoc.save()

        res.render('admin/newProject', {
            layout: "layout",
            title: 'Admin | New Project',
            message: 'Project Created Successfully'
        })

    }))

router.route('/projects/projectDetails/:alias')
    .get(asyncHandler(async (req, res) => {
        let alias = req.params.alias

        let project = await Project.findOne({ alias: alias })

        res.render('admin/projectDetails', {
            layout: "layout",
            title: `Project | ${project.name}`,
            project: project,
            MERNfilter: project.filter.includes('MERN'),
            Reactfilter: project.filter.includes('React'),
            JSfilter: project.filter.includes('JS')
        })
    }))
    .post(asyncHandler(async (req, res) => {
        let alias = req.body.alias
        req.body.alias = req.body.name.split(' ').join('-').toLowerCase();
        await Project.findOneAndUpdate({ alias: alias }, { $set: req.body })

        let project = await Project.findOne({ alias: alias })

        res.render('admin/projectDetails', {
            layout: "layout",
            title: `Project | ${project.name}`,
            project: project,
            MERNfilter: project.filter.includes('MERN'),
            Reactfilter: project.filter.includes('React'),
            JSfilter: project.filter.includes('JS'),
            message: 'Updated successfully'
        })
    }))

router.use('/projects/projectDetails/upload', uploadRoutes)

router.get('/project/delete/:alias', asyncHandler(async (req, res) => {
    await Project.findOneAndDelete({ alias: req.params.alias })
    let projects = await Project.find()
    res.render('admin/projectList', {
        layout: "layout",
        title: 'Admin | Projects',
        projects: projects,
        message: "Project deleted Successfully!!"
    })
}))


module.exports = router