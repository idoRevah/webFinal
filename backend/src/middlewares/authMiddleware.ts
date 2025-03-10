// src/middleware/authMiddleware.ts
import jwt from "jsonwebtoken";
import User from "../models/userModel";

// TODO: return after developing
export const authenticate = async (req: any, res: any, next: any) => {
  // next();
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    console.log("Token:", token); // Debugging: Log the token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
    console.log("Decoded:", decoded); // Debugging: Log decoded data
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ message: "Invalid token" });
    next();
  } catch (err) {
    console.error("Authentication Error:", err); // Debugging
    res.status(401).json({ message: "Unauthorized" });
  }
};
