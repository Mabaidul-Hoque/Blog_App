const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 3 },
  description: { type: String, required: true, minLength: 3 },
  tags: {
    type: [String],
    default: ["General"],
    required: true,
  },
  imageUrl: { type: String, default: "" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: String,
  upvote: { type: Number, default: 0 },
  downvote: { type: Number, default: 0 },
  votedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
