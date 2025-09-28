import User from "../models/User.js";
import Artist from "../models/artists.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const signup = async (req, res) => {
  try {
    console.log(req.body);
    
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body);

    const { role, email, password } = req.body;

    if (!role || !email || !password) {
      return res.status(400).json({ error: "Role, email, and password required" });
    }

    let user;

    // Choose schema based on role
    if (role === "artist") {
      user = await Artist.findOne({ email });
    } else if (role === "visitor") {
      user = await User.findOne({ email });
    } else {
      return res.status(400).json({ error: "Invalid role" });
    }

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // Create JWT payload
    const payload = { id: user._id, username: user.username, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    // Prepare response
    const userId = user._id;
    const userName = user.username || "";

    res.status(200).json({ userId, userName, token ,role});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
