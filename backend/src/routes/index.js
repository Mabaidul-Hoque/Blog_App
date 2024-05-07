const router = require("express").Router();
const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/auth", userRoutes);
router.use("/blog", blogRoutes);
router.use("/blog/comment", commentRoutes);

module.exports = router;
