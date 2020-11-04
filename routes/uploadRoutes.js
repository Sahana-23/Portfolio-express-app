const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const multer = require('multer')
const AWS = require('aws-sdk')

const Project = require("../models/projectModel")

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({ storage })

router.route('/coverImage/:alias')
    .get(asyncHandler(async (req, res) => {
        let project = await Project.findOne({ alias: req.params.alias })
        res.render("admin/uploadCoverImage", {
            layout: "layout",
            title: "Image upload",
            project: project
        })
    }))
    .post(upload.single('coverImageUrl'), asyncHandler(async (req, res) => {
        let filename = req.file.fieldname + '-' + Date.now() + "." + req.file.mimetype.split('/')[1]
        const params = {
            ACL: "public-read",
            Bucket: process.env.BUCKET_NAME,
            Key: `coverImages/${filename}`,
            Body: req.file.buffer
        }

        s3.upload(params, (error, data) => {
            if (error) {
                res.status(500).send(error)
            }

            Project.findOneAndUpdate({ alias: req.params.alias }, { $set: { coverImageUrl: data.Location } })
                .then(async data => {
                    let project = await Project.findOne({ alias: req.params.alias })
                    res.render("admin/uploadCoverImage", {
                        layout: "layout",
                        title: "Image upload",
                        project: project,
                        message: "Uploaded Successfully"
                    })
                })
                .catch(err => next(err))


        })
    }))


router.route('/carouselImage/:alias')
    .get(asyncHandler(async (req, res) => {
        let project = await Project.findOne({ alias: req.params.alias })
        res.render("admin/uploadCarouselImage", {
            layout: "layout",
            title: "Image upload",
            project: project
        })
    }))
    .post(upload.array('carouselImageUrl'), asyncHandler(async (req, res) => {

        let imgArray = []

        for (var item of req.files) {
            let filename = item.fieldname + '-' + Date.now() + "." + item.mimetype.split('/')[1]
            var params = {
                ACL: "public-read",
                Bucket: process.env.BUCKET_NAME,
                Key: `${req.params.alias}/${filename}`,
                Body: item.buffer
            }
            let res = await new Promise((resolve, reject) => {
                s3.upload(params, function (err, data) {
                    if (err) {
                        next(err)
                    } else {
                        resolve(data)
                    }
                })
            })
            imgArray.push(res.Location)
        }

        Project.findOneAndUpdate({ alias: req.params.alias }, { $set: { carouselUrl: imgArray } })
            .then(async data => {
                let project = await Project.findOne({ alias: req.params.alias })
                res.render("admin/uploadCarouselImage", {
                    layout: "layout",
                    title: "Image upload",
                    project: project,
                    carouselUrl: project.carouselUrl,
                    message: "Updated Successfully"
                })
            })
            .catch(err => next(err))

    }))

router.route('/resume')
    .get((req, res) => {
        res.render("admin/uploadResume", {
            layout: "layout",
            title: "Resume upload",
        })
    })
    .post(upload.single('resume'), (req, res) => {
        let filename = "resume" + "." + req.file.mimetype.split('/')[1]
        const params = {
            ACL: "public-read",
            Bucket: process.env.BUCKET_NAME,
            Key: `resume/${filename}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }

        s3.upload(params, (error, data) => {
            if (error) {
                res.status(500).send(error)
            } else {
                res.render("admin/uploadResume", {
                    layout: "layout",
                    title: "Resume upload",
                    message: "Uploaded Successfully"
                })
            }
        })
    })

module.exports = router