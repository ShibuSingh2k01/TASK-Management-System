import express from "express";
import {
  viewGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js";

import protect from "../../middleware/authMiddleware.js";

const router = express.Router();

// Fetch goals
router.get("/", protect, viewGoals);

// Create a goal
router.post("/", protect, createGoal);

// Update a goal
router.put("/:id", protect, updateGoal);

// Delete a goal
router.delete("/:id", protect, deleteGoal);

export default router;
