const User = require("../models/userModel");

const loginUser = async (req, res) => {
  res.json({ mssg: "Login User" });
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    // check if the user is an instance of the Error object
    if (user instanceof Error) {
      return res.status(400).json({ error: user.message });
    }

    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
