const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { email, password, fullname, location, contact } = req.body;

    if (!email || !password || !fullname) {
      return res.status(400).json({ message: "Required fields missing" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      fullname,
      location,
      contact,
      role: "user",
    });

    const token = generateToken(newUser);

    res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
});

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });

  if (!user)
    return res.status(401).json({ message: "Incorrect Login Credentials" });

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (result) {
      let token = generateToken(user);
      res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
});

      console.log("Logged in user:", user);

      return res.json({
        message: "You can Login",
        token,
        role: user.role,
        email: user.email,
        name: user.name,
        id: user._id,
      });
    } else {
      return res.status(401).json({ message: "Incorrect login Details" });
    }
  });
};

module.exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports.displayUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};
