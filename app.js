const express = require("express");
const cors = require('cors');
require('./config/db');

const app = express();

const userRouter = require('./routes/users.route');
const leadRouter = require('./routes/leads.route');
const blogRouter = require('./routes/blogs.route');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/leads', leadRouter)

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