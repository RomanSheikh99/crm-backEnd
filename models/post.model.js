const { default: mongoose } = require("mongoose");


const postSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    blog: {
        type: String,
        require: true
    },
    image: {
        type: String,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('posts', postSchema);