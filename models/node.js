let mongoose = require('mongoose')

let nodeSchema = mongoose.Schema({
    question: {
        type: String,
        require: false
    },
    name: {
        type: String,
        require: true
    },
    father: {
        type: String,
        require: false
    },
    last_answer: {
        type: Boolean,
        require: false
    },
    termination: {
        type: String,
        require: false
    }
}, {
    collection: 'node'
})

let Node = module.exports = mongoose.model('node', nodeSchema)