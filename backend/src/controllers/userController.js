const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Checking if the user already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res
        .status(400)
        .json({ status: "fail", message: "User already exists" });
    }

    // Creating a new user
    const newUser = {
      username,
      email,
      password, // Password will be hashed in the pre-save hook
    };
    const user = await User.create(newUser);

    // Generating JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60,
      }
    );

    res.status(201).json({
      status: "Success",
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Findind the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    // Comparing the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid credentials" });
    }

    // Generating JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60,
      }
    );

    const userWithoutPassword = await User.findOne({ email }).select({
      password: 0,
    });
    res.status(200).json({
      status: "Success",
      message: "User logged in successfully",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { registerUser, loginUser };
