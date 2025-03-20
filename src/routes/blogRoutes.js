const express = require("express");
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getOneBlog,
} = require("../controllers/blogController");
const isUserValid = require("../middlewares/isUserValid");

const router = express.Router();

router.post("/create", isUserValid, createBlog);
router.put("/update/:id", isUserValid, updateBlog);
router.delete("/delete/:id", isUserValid, deleteBlog);
router.get("/allblogs", getAllBlogs);
router.get("/one/:id", getOneBlog);

module.exports = router;
