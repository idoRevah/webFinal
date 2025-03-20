import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import bcrypt from 'bcryptjs';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your_refresh_secret';

// Temporary storage for refresh tokens
const refreshTokens: Set<string> = new Set();

export const googleLogin = async (req: any, res: any) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ message: "Invalid ID token" });
    }
    const { email, name: username, picture: imageUrl } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        username,
        imageUrl,
      });
    }

    const token = jwt.sign(
      { email: user.email, username, imageUrl, id: user._id },
      JWT_SECRET || "",
      { expiresIn: "1d" }
    );
    res.json({ token, username, imageUrl, id: user.id });
  } catch (error) {
    console.error("Error verifying Google ID token:", error);
    res.status(500).json({ message: "Authentication failed" });
  }
};


export const registerUser = async (req: any, res: any) => {
  const { email, password, username } = req.body;
  const imageUrl = req.file
      ? `${process.env.URL}:${process.env.PORT}/uploads/${req.file.filename}`
      : "test";

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists.' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({ email, username, password: hashedPassword, imageUrl: imageUrl });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error.', error });
  }
};

export const updateUser = async (req: any, res: any) => {
  const { userId } = req.params;
  const { username } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user !== req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (username) user.username = username;
    if (imageUrl) user.imageUrl = imageUrl;

    await user.save();

    res.status(200).json({ message: "User updated successfully.", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error.", error });
  }
};

export const loginUser = async (req: any, res: any) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user || !user.password) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    // Generate access and refresh tokens
    const accessToken = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1d',
    });
    const refreshToken = jwt.sign({ id: user._id, email: user.email }, REFRESH_SECRET, {
      expiresIn: '7d',
    });

    // Store the refresh token
    refreshTokens.add(refreshToken);

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error.', error });
  }
};

export const logoutUser = (req: any, res: any) => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token required.' });
      return;
    }

    // Remove the refresh token from storage
    if (refreshTokens.has(refreshToken)) {
      refreshTokens.delete(refreshToken);
      res.status(200).json({ message: 'Logged out successfully.' });
    } else {
      res.status(403).json({ message: 'Invalid refresh token.' });
    }
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal server error.', error });
  }
};

export const refreshToken = (req: any, res: any) => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token required.' });
      return;
    }

    if (!refreshTokens.has(refreshToken)) {
      res.status(403).json({ message: 'Invalid refresh token.' });
      return;
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as { id: string; email: string };

    if (!decoded || !decoded.id || !decoded.email) {
      res.status(403).json({ message: 'Invalid refresh token.' });
      return;
    }

    // Generate a new access token
    const accessToken = jwt.sign({ id: decoded.id, email: decoded.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error during token refresh:', error);
    res.status(403).json({ message: 'Invalid refresh token.', error });
  }
};
