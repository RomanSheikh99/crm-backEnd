const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const {
    v4: uuidv4
} = require('uuid');


const blogs = express();

const {
    postBlog,
    getBlogs,
    getOneBlog,
    updateBlog,
    deleteBlog
} = require('../controlers/posts.controler');


blogs.use(bodyParser.urlencoded({
    extended: true
}));
blogs.use(express.static(path.resolve(__dirname, "public")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/blogImages')
    },
    filename: (req, file, cb) => {
        const filename = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, filename);
    },
})

const upload = multer({
    storage: storage
});



blogs.post('/', upload.single('image'), postBlog);
blogs.get('/', getBlogs);
blogs.get('/:id', getOneBlog)
blogs.patch('/:id', updateBlog)
blogs.delete('/:id', deleteBlog)



module.exports = blogs;