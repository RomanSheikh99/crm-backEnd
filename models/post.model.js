const { default: mongoose } = require("mongoose");


const blogSchema = mongoose.Schema({
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

module.exports = mongoose.model('Blog', blogSchema);