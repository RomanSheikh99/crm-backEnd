const { default: mongoose } = require("mongoose");


const userSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        default: "marketer",
    },
    showPass: {
        type: String,
        require: true
    },
    pass: {
        type: String,
        require: true
    },
    quarterlyTarget: {
        newCall: {type: Number, default: 40},
        highLead: {type: Number, default: 5},
        newTest: {type: Number, default: 12},
        newFil: {type: Number, default: 3},
    },
    monthlyTarget: {
        newCall: {type: Number, default: 40},
        highLead: {type: Number, default: 5},
        newTest: {type: Number, default: 12},
        newFil: {type: Number, default: 3},
    },
    quarter: [{
        title: String,
        target: {
            newCall: {type: Number, default: 0},
            highLead: {type: Number, default: 0},
            newTest: {type: Number, default: 0},
            newFil: {type: Number, default: 0},
        },
        bit:[{
            status: String,
            possibility: String,
          }]
      }],
    month: [{
        title: String,
        target: {
            newCall: {type: Number, default: 0},
            highLead: {type: Number, default: 0},
            newTest: {type: Number, default: 0},
            newFil: {type: Number, default: 0},
        },
        bit:[{
            status: String,
            possibility: String,
          }]
      }],
    createdOn: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Users', userSchema);