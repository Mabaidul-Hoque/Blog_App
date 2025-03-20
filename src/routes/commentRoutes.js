const express = require("express");
const isUserValid = require("../middlewares/isUserValid");
const {
  addComment,
  updateComment,
  deleteComment,
  getAllComments,
  getOneComment,
} = require("../controllers/commentController");

const router = express.Router();

router.post("/add/:blogId", isUserValid, addComment);
router.put("/update/:commentId", isUserValid, updateComment);
router.delete("/delete/:commentId", isUserValid, deleteComment);
router.get("/all", getAllComments);
router.get("/one/:commentId", getOneComment);

module.exports = router;
