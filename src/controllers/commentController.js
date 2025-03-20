const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Blog = require("../models/blogModel");

const addComment = async (req, res) => {
  const { message } = req.body;
  const { blogId } = req.params;
  const userId = req.userId;
  try {
    // Checking if blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Creating new comment
    const newComment = {
      message,
      user: userId,
      blog: blogId,
    };
    const comment = await Comment.create(newComment);

    // Updating the blog with the new comment
    await Blog.findByIdAndUpdate(blogId, { $push: { comments: comment._id } });

    res.status(200).json({
      status: "Success",
      message: "Comment created successfully",
      data: comment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating comment entry", error: error.message });
  }
};

const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.userId;
  try {
    // Find the comment to update
    const commentToBeUpdate = await Comment.findById(commentId);
    if (!commentToBeUpdate) {
      return res.status(404).json({ message: "Comment not found" });
    }
    // Checking if the user is authorized to update the comment
    if (commentToBeUpdate.user.toString() !== userId) {
      return res.status(403).json({
        status: "failed",
        message: "You are not authorized to delete this blog",
      });
    }

    // Update the comment
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      req.body,
      {
        new: true,
      }
    );
    // Find the blog where comment is created
    const blog = await Blog.findById(commentToBeUpdate.blog);
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }
    // Update the reference in the blog's 'comments' array
    const index = blog.comments.indexOf(commentId);
    if (index !== -1) {
      blog.comments[index] = updatedComment._id;
      await blog.save();
    }

    res
      .status(200)
      .json({ message: "Comment updated successfully", data: updatedComment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.userId;
  try {
    // Find the Comment to delete
    const commentToBeDelete = await Comment.findById(commentId);
    if (!commentToBeDelete) {
      return res
        .status(404)
        .json({ status: "failed", message: "Comment not found" });
    }
    // Checking if the user is authorized to delete the comment
    if (commentToBeDelete.user.toString() !== userId) {
      return res.status(403).json({
        status: "failed",
        message: "You are not authorized to delete this comment",
      });
    }

    // Delete the comment
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    // Find the blog where comment is created
    const blog = await Blog.findById(commentToBeDelete.blog);
    if (!blog) {
      return res
        .status(404)
        .json({ status: "failed", message: "Blog not found" });
    }

    // Remove the comment reference from the blog's 'comments' array
    blog.comments.pull(commentId);
    await blog.save();

    res.status(200).json({
      status: "Success",
      message: "Comment deleted successfully",
      data: deletedComment,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllComments = async (req, res) => {
  try {
    const data = await Comment.find();
    if (!data) {
      res
        .status(404)
        .json({ status: "failed", message: "Comment data not found!" });
    }

    res.status(200).json({
      status: "Success",
      message: `Found ${data.length} comment data`,
      results: data.length,
      data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getOneComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    const data = await Comment.findById(commentId);
    if (!data) {
      res
        .status(404)
        .json({ status: "failed", message: "Comment data not found!" });
    }

    res.status(200).json({
      status: "Success",
      message: "Found comment data",
      data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  addComment,
  updateComment,
  deleteComment,
  getAllComments,
  getOneComment,
};
