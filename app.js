const express = require("express");
const cors = require('cors');
// const mongoose = require('mongoose');
require('./config/db');

const app = express();

const userRouter = require('./routes/users.route');


// mongoose.connect('mongodb+srv://roman:qtMOQpjDcZ7iW5bJ@cluster0.3xtjfot.mongodb.net/test').then(() => {
//     console.log('server is conected')
// }).catch(err => console.log(err));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.use((req, res, next) => {
    res.status(404).json({
        massage: "Not A Route!"
    })
})


app.use((err, req, res, next) => {
    res.status(500).json({
        massage: "Server Not Found!"
    })
})

module.exports = app;