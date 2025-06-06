import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const createUser = async (req, res) => {
  // console.log(req.body);

  const { name, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const user = await User.create({
      name,
      email,
      password: passwordHash,
    });
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET);
    // console.log(token);

    // res.cookie("token", token, {
    //   httpOnly: true, // ⛔ Can't be accessed via JS (important!)
    //   secure: false, // Set true if HTTPS (use with production)
    //   sameSite: "strict", // CSRF protection
    //   maxAge: 3600000, // 1 hour
    //   path: "/",
    // });
    // console.log("Set-Cookie header:", res.getHeaders()["set-cookie"]);

    return res
      .status(200)
      .json({ token: token, message: "user signed up successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Signup failed" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET);
    // res.cookie("token", token, {
    //   httpOnly: true, // ⛔ Can't be accessed via JS (important!)
    //   secure: false, // Set true if HTTPS (use with production)
    //   sameSite: "strict", // CSRF protection
    //   maxAge: 3600000, // 1 hour
    //   path: "/",
    // });

    // console.log("Set-Cookie header:", res.getHeaders()["set-cookie"]);

    return res
      .status(200)
      .json({ token: token, message: "user signed in successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Login failed" });
  }
};
