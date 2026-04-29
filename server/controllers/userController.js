import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) => {
  const payload = userId;
  return jwt.sign(payload, process.env.JWT_SECRET);
};

// Register A User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Please Fill In All The Required Fields",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Your Password Must Be At Least 8 Characters Long",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({
        success: false,
        message: "A User With This Email Already Exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(user._id.toString());
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// User Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "This User Was Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect Password",
      });
    }
    const token = generateToken(user._id.toString());
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Data Using JWT Token
export const getUserData = async (req, res) => {
  try {
    const { user } = req;
    res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
