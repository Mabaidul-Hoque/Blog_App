const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minLength: 4 },
  password: { type: String, required: true, unique: true, minLength: 5 },
  email: { type: String, required: true, unique: true, minLength: 5 },
  later: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
  resetPasswordToken: String,
  resetPasswordExpire: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
