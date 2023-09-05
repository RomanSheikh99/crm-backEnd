const {
  v4: uuidv4
} = require('uuid')
const Blog = require("../models/post.model")


const postBlog = async (req, res) => {
  try {
    const { title, blog } = req.body;
    const imageUrl = req.file ? `/blogImages/${req.file.filename}` : null;

    const newBlog = new Blog({
      id: uuidv4(),
      title,
      blog,
      image: imageUrl,
    });

    await newBlog.save();

    res.status(200).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};


const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs.reverse());
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      id: req.params.id
    });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).send(error.message);
  }
}


const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      id: req.params.id
    });
    blog.title = req.body.title;
    blog.blog = req.body.blog;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteBlog = async (req, res) => {
  try {
    await Blog.deleteOne({
      id: req.params.id
    });
    res.status(200).json({
      message: "Lead Deleted"
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};



module.exports = {
  postBlog,
  getBlogs,
  getOneBlog,
  updateBlog,
  deleteBlog
};