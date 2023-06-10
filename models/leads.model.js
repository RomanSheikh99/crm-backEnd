const {
    default: mongoose
} = require("mongoose");


const leadsSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    leadsNo: {
        type: String,
        require: true
    },
    company: {
        type: String,
        default: null
    },
    website: {
        type: String,
        default: null
    },
    category: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    contactParson: {
        type: String,
        default: null
    },
    designation: {
        type: String,
        default: null
    },
    record: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    minor: {
        type: String,
        default: "Admin"
    },
    followerName: {
        type: String,
        default: null
    },
    followerID: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: null
    },
    possibility: {
        type: String,
        default: null
    },
    nextFollowUP: {
        type: Date,
        default: null
    },
    trash: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Leads', leadsSchema);