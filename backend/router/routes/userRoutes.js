import express from "express";
import protect from "../../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getUserDetails,
} from "../controllers/userController.js";

const router = express.Router();

// Register
router.post("/", registerUser);
// Login
router.post("/login", loginUser);
// GetUserDetails
router.get("/details", protect, getUserDetails);

export default router;
