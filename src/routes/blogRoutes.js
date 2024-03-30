const express = require("express");
const {
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const isUserValid = require("../middlewares/isUserValid");

const router = express.Router();

router.post("/create", isUserValid, createBlog);
router.put("/:id", isUserValid, updateBlog);
router.delete("/:id", isUserValid, deleteBlog);

module.exports = router;
