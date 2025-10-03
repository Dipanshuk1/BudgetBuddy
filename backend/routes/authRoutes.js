import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);    // Register
router.post("/login", loginUser);          // Login
router.get("/me", protect, getUserProfile); // Get user profile

export default router;
