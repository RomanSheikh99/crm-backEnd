const {
    default: mongoose
} = require("mongoose");


const leadsSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    leadsNo: Number,
    company: String,
    website: String,
    category: String,
    minor: String,
    phone: String,
    followerName: String,
    followerID: String,
    status: String,
    possibility: String,
    nextFollowUP: {
        type: Date,
    },
    hidden: Boolean,
    createdOn: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Leads', leadsSchema);