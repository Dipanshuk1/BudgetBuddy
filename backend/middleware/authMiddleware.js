import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // ✅ Check if token exists in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // ✅ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Attach user to request (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ success: false, message: "User not found, token invalid" });
      }

      next();
    } else {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired, please log in again" });
    }
    
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};
