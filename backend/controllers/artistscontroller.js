import User from "../models/artists.js"; // adjust path if needed
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Ensure you have these in your .env
// JWT_SECRET=your_super_secret_key
// JWT_EXPIRES_IN=1d

export const artistSignup = async (req, res) => {
  try {
    const { username, email, password, bio, portfolio, socialLinks, profilePicture } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Artist with this email already exists" });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      bio,
      portfolio,
      socialLinks,
      profilePicture,
    });

    await newUser.save();

    // 4. Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    // 5. Respond with user info and token
    res.status(201).json({
      message: "Artist profile created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        bio: newUser.bio,
        portfolio: newUser.portfolio,
        socialLinks: newUser.socialLinks,
        profilePicture: newUser.profilePicture,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid" });
  }
};
