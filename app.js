const express = require("express");
const cors = require('cors');
require('./config/db');

const app = express();

const userRouter = require('./routes/users.route');
const leadRouter = require('./routes/leads.route');
const blogRouter = require('./routes/blogs.route');

app.use(cors({
    origin: '*',
}));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


app.use((req, res, next) => {
    console.log("Got here from app js");
    next();
})


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/leads', leadRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

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