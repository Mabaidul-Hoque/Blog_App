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
  const blogId = req.params.id;
  const userId = req.userId;
  try {
    // Find the blog to update
    const blogToUpdate = await Blog.findById(blogId);
    if (!blogToUpdate) {
      return res.status(404).json({ message: "Blog not found" });
    }
    // Checking if the user is authorized to update the blog
    if (blogToUpdate.user.toString() !== userId) {
      return res.status(403).json({
        status: "failed",
        message: "You are not authorized to delete this blog",
      });
    }

    // Update the blog
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
      new: true,
    });
    // Find the user who created the blog
    const user = await User.findById(blogToUpdate.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update the reference in the user's 'later' array
    const index = user.later.indexOf(blogId);
    if (index !== -1) {
      user.later[index] = updatedBlog._id;
      await user.save();
    }

    res
      .status(200)
      .json({ message: "Blog updated successfully", data: updatedBlog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.userId;
  try {
    // Find the blog to delete
    const blogToDelete = await Blog.findById(blogId);
    if (!blogToDelete) {
      return res
        .status(404)
        .json({ status: "failed", message: "Blog not found" });
    }
    // Checking if the user is authorized to delete the blog
    if (blogToDelete.user.toString() !== userId) {
      return res.status(403).json({
        status: "failed",
        message: "You are not authorized to delete this blog",
      });
    }

    // Delete the blog
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    // Find the user who created the blog
    const user = await User.findById(blogToDelete.user);
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }

    // Remove the blog reference from the user's 'later' array
    user.later.pull(blogId);
    await user.save();

    res.status(200).json({
      status: "Success",
      message: "Blog deleted successfully",
      data: deletedBlog,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const data = await Blog.find();
    if (!data) {
      res
        .status(404)
        .json({ status: "failed", message: "Blog data not found!" });
    }

    res.status(200).json({
      status: "Success",
      message: `Found ${data.length} blog data`,
      results: data.length,
      data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getOneBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const data = await Blog.findById(blogId).populate({
      path: "user",
      model: "users",
    });
    if (!data) {
      res
        .status(404)
        .json({ status: "failed", message: "Blog data not found!" });
    }

    res.status(200).json({
      status: "Success",
      message: "Found blog data",
      data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getOneBlog,
};
