import asyncHandler from "express-async-handler";

import Goal from "../../database/models/goalModel.js";
import User from "../../database/models/userModel.js";

const viewGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({ user: req.user.id });
	res.status(200).json(goals);
});

const createGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error("Please add Text Field");
	}

	const goal = await Goal.create({
		text: req.body.text,
		user: req.user.id,
	});

	res.status(200).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error("Goal does not exist");
	}

	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error("User does not exist");
	}

	if (goal.user.toString() === user.id) {
		res.status(401);
		throw new Error("Not authorized to update");
	}

	const updatedGoal = await Goal.findByIdAndUpdate(goal.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error("Goal does not exist");
	}

	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error("User does not exist");
	}

	if (goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error("Not authorized to delete");
	}

	await Goal.findByIdAndDelete(goal.id);

	res.status(200).json({ id: goal.id });
});

export { createGoal, viewGoals, updateGoal, deleteGoal };
