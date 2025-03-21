const router = require("express").Router();
const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/auth", userRoutes);
router.use("/blog", blogRoutes);
router.use("/blog/comment", commentRoutes);

// Test route (optional, for debugging)
router.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Vercel!' });
  });

module.exports = router;
