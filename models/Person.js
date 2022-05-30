const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    height: Number,
    approved: Boolean,
})

module.exports = Person