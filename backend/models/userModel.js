const mongoose = require("mongoose");
const brcypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static signup method
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    return new Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    return new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    return new Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    return new Error("Email already in use");
  }

  const salt = await brcypt.genSalt(10);
  const hash = await brcypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

module.exports = mongoose.model("User", userSchema);
