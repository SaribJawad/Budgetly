import { Goal } from "../models/goal.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose, { mongo } from "mongoose";

const createGoal = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!mongoose.isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid User ID");
  }

  const { name, targetAmount, goalDeadline } = req.body;

  const requiredFields = { name, targetAmount, goalDeadline };

  for (const [key, values] of Object.entries(requiredFields)) {
    if (!values) {
      throw new ApiError(400, `${key} is required`);
    }
  }

  const addFields = Object.assign(
    {},
    { user: userId },
    req.body.name && { name: req.body.name },
    req.body.targetAmount && { targetAmount: req.body.targetAmount },
    req.body.savedAlready && { savedAlready: req.body.savedAlready },
    req.body.goalDeadline && { goalDeadline: req.body.goalDeadline }
  );

  const goal = await Goal.create(addFields);

  if (!goal) {
    throw new ApiError(500, "Something went wrong while creating the goal");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, goal, "Goal created succesfully"));
});

const getAllGoals = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!mongoose.isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const goals = await Goal.find({ user: userId });

  if (!goals) {
    throw new ApiError(500, "Something went wrong while fetching goals");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, goals, "Goals fetched successfully"));
});

const getGoalById = asyncHandler(async (req, res) => {
  const { goalId } = req.params;

  if (!mongoose.isValidObjectId(goalId)) {
    throw new ApiError(400, "Invalid goal ID");
  }

  const goal = await Goal.findById(goalId);

  if (!goal) {
    throw new ApiError(500, "Something went wrong while fetching goal");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, goal, "Goal fetched successfully"));
});

const updateGoal = asyncHandler(async (req, res) => {
  const { goalId } = req.params;

  if (!mongoose.isValidObjectId(goalId)) {
    throw new ApiError(400, "Invalid goal ID");
  }

  const updateFields = Object.assign(
    {},
    req.body.targetAmount && { targetAmount: req.body.targetAmount },
    req.body.savedAlready && {
      savedAlready: req.body.targetAmount,
      lastAddedAmount: req.body.targetAmount,
    },

    req.body.name && { name: req.body.name },
    req.body.goalDeadline && { goalDeadline: req.body.goalDeadline }
  );

  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(400, "Atleast one field is required to update");
  }

  if (
    updateFields.goalDeadline &&
    new Date(updateFields.goalDeadline) < new Date()
  ) {
    throw new ApiError(400, "Goal deadline date cannot be in the past");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(goalId, updateFields);

  if (!updatedGoal) {
    throw new ApiError(500, "Something went wrong while updating goal");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Goal updated successfully"));
});

const deleteGoal = asyncHandler(async (req, res) => {
  const { goalId } = req.params;

  if (!mongoose.isValidObjectId(goalId)) {
    throw new ApiError(400, "Invalid goal ID");
  }

  try {
    const deletedGoal = await Goal.findByIdAndDelete(goalId);

    if (!deletedGoal) {
      throw new ApiError(404, "Goal not found.");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Goal deleted successfully."));
  } catch (error) {
    throw new ApiError(500, "An error occurred while deleting the goal.");
  }
});

const markGoalAsReached = asyncHandler(async (req, res) => {
  const { goalId } = req.params;

  if (!mongoose.isValidObjectId(goalId)) {
    throw new ApiError(400, "Invalid goal Id.");
  }

  const goalReached = await Goal.findByIdAndUpdate(
    goalId,
    {
      goalReached: true,
    },
    { new: true }
  );

  if (!updateGoal) {
    throw new ApiError(
      500,
      "Something went wrong while marking goal as reached."
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, goalReached, "Goal marked as reached successfully")
    );
});

const getReachedGoals = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!mongoose.isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID.");
  }

  try {
    const goals = await Goal.find({ user: userId, goalReached: true });

    if (!goals) {
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "No reached goals found."));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, goals, "Reached goals fetched succesfully."));
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while fetching reached goals."
    );
  }
});

const getUncompletedGoals = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!mongoose.isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID.");
  }

  try {
    const goals = await Goal.find({ user: userId, goalReached: false });

    if (!goals) {
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "No uncompleted goals found."));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, goals, "Uncompleted goals fetched succesfully.")
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while fetching uncompleted goals."
    );
  }
});

const addSavedAmount = asyncHandler(async (req, res) => {
  const { goalId } = req.params;
  const { savedAmount } = req.body;

  if (!mongoose.isValidObjectId(goalId)) {
    throw new ApiError(400, "Invalid goal ID");
  }

  if (typeof savedAmount !== "number" || savedAmount <= 0) {
    throw new ApiError(400, "Invalid saved amount");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(
    goalId,
    {
      $inc: { savedAlready: savedAmount },
      lastAddedAmount: savedAmount,
    },
    { new: true }
  );

  if (updatedGoal.savedAlready >= updatedGoal.targetAmount) {
    updatedGoal.goalReached = true;
    await updatedGoal.save();
  }

  if (!updatedGoal) {
    throw new ApiError(404, "Goal not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedGoal, "Saved amount added successfully"));
});

export {
  createGoal,
  getAllGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
  markGoalAsReached,
  getReachedGoals,
  getUncompletedGoals,
  addSavedAmount,
};
