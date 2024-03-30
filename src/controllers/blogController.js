const Blog = require("../models/blogModel");
const User = require("../models/userModel");

const createBlog = async (req, res) => {
  try {
    const { title, description, tags, imageUrl } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);

    // Creating new blog
    const newBlog = {
      title,
      description,
      tags,
      imageUrl,
      user: userId,
      username: user.username,
    };
    const blog = await Blog.create(newBlog);
    await User.findByIdAndUpdate(userId, { $push: { later: blog._id } });
    res.status(200).json({
      status: "Success",
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating blog entry", error: error.message });
  }
};

const updateBlog = async (req, res) => {
  res.status(200).json({ message: "success" });
};

const deleteBlog = async (req, res) => {
  res.status(200).json({ message: "success" });
};

module.exports = { createBlog, updateBlog, deleteBlog };
