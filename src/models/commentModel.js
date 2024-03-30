const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: String, required: true },
  like: { type: Number, default: 0 },
  isNested: { type: Boolean, default: false },
  parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("comments", commentSchema);
