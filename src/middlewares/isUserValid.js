const jwt = require("jsonwebtoken");

const isUserValid = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid token",
        error: err.message,
      });
    }

    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = userInfo;
    req.userId = userId;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ status: "failed", message: "Missing authorization" });
  }
};

module.exports = isUserValid;
