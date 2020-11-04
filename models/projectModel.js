const mongoose = require("mongoose")
const schema = mongoose.Schema;

const projectSchema = new schema({
    name: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: true,
        unique: true
    },
    githubUrl: {
        type: String,
        trim: true
    },
    demoUrl: {
        type: String,
        trim: true
    },
    subheading: String,
    description: String,
    coverImageUrl: String,
    carouselUrl: [String],
    filter: [String]
}, {
    timestamps: true
})

module.exports = mongoose.model('projects', projectSchema)