const mongoose = require('mongoose')
const schema = mongoose.Schema
var userSchema = new schema({ email: String, password: String }, { collection: 'user' });

module.exports = mongoose.model('user', userSchema)
