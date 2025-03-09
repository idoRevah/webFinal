import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req: any, res: any) => {
  const idToken = req.body.token;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ message: "Invalid ID token" });
    }
    console.log(payload);
    const { email, name: username, picture: imageUrl } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        username,
        imageUrl,
      });
    }
    console.log(user);

    const token = jwt.sign(
      { email: user.email, username, imageUrl },
      process.env.JWT_SECRET || "",
      { expiresIn: "1d" }
    );
    res.json({ token });
  } catch (error) {
    console.error("Error verifying Google ID token:", error);
    res.status(500).json({ message: "Authentication failed" });
  }
};
