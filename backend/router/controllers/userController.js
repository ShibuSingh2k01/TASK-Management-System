import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../database/models/userModel.js";

// Register
const registerUser = asyncHandler(async (req, res) => {
  // Req Payload
  const { name, email, password } = req.body;

  // Handle Incomplete Data
  if (!name || !email || !password) {
    res.status(400);
    if (!name && !email && !password) throw new Error("All fields are empty");
    if (!name) throw new Error("Please enter name");
    if (!email) throw new Error("Please enter email");
    if (!password) throw new Error("Please enter password");
  }

  // Handle Existing User
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Handle New User
  // Hash the Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Ouput
  if (user) {
    res.status(201).json({
      _id: user.id, //String form of ID
      name: user.name,
      email: user.mail,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// Login
const loginUser = asyncHandler(async (req, res) => {
  // Req Payload
  const { email, password } = req.body;

  // Handle Incomplete Data
  if (!email || !password) {
    res.status(400);
    if (!email && !password) throw new Error("All fields are empty");
    if (!email) throw new Error("Please enter email");
    if (!password) throw new Error("Please enter password");
  }

  // Find user
  const existingUser = await User.findOne({ email });

  // No existing User
  if (!existingUser) {
    res.status(400);
    throw new Error("User does not Exist");
  }

  // User Found
  if (await bcrypt.compare(password, existingUser.password)) {
    res.status(200).json({
      _id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      token: generateToken(existingUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// GetUserDetails
const getUserDetails = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id); //req.user parameter is added using jwt for sessions

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export { registerUser, loginUser, getUserDetails };
