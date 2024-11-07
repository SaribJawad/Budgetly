import { Budget } from "../models/budget.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBudget = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const { name, period, amount, category, wallet } = req.body;

  const requiredFields = {
    name,
    amount,
    wallet,
  };

  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      throw new ApiError(400, `${key} is required`);
    }
  }

  const existingBudget = await Budget.findOne({
    user: userId,
    category: category || "All",
    wallet,
  });

  console.log(existingBudget);

  if (existingBudget) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          existingBudget,
          `You already have a budget for category - ${
            category ? category : "All"
          }`
        )
      );
  }

  const budget = await Budget.create({
    user: userId,
    name,
    period: period || undefined,
    amount,
    category: category || undefined,
    wallet,
  });

  if (!budget) {
    throw new ApiError(500, "Something went wrong while creating the budget");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, budget, "Budget created successfully"));
});

const getAllBudgets = asyncHandler(async (req, res) => {
  const { walletId } = req.params;

  if (!walletId) {
    throw new ApiError(400, "Wallet ID is required");
  }

  const budgets = await Budget.find({
    wallet: walletId,
  });

  if (!budgets) {
    throw new ApiError(500, "Something went wrong while fetching budgets");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, budgets, "Budgets fetched successfully"));
});

const getBudgetById = asyncHandler(async (req, res) => {
  const { budgetId } = req.params;

  if (!budgetId) {
    throw new ApiError(400, "Budget ID is required");
  }

  const budget = await Budget.findById(budgetId);

  if (!budget) {
    throw new ApiError(500, "Something went wrong while fetching the budget");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, budget, "Budget fetched successfully"));
});

const updateBudget = asyncHandler(async (req, res) => {
  const { budgetId } = req.params;
  if (!budgetId) {
    throw new ApiError(400, "Budget ID is required");
  }

  const updateFields = Object.assign(
    {},
    req.body.name && { name: req.body.name },
    req.body.amount && { amount: req.body.amount },
    req.body.period && { period: req.body.period },
    req.body.notifyOnExceed && { notifyOnExceed: req.body.notifyOnExceed },
    req.body.notifyOnTrending && { notifyOnTrending: req.body.notifyOnTrending }
  );

  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(400, "At least one field is required");
  }

  const updatedBudget = await Budget.findByIdAndUpdate(budgetId, updateFields, {
    new: true,
  });

  if (!updatedBudget) {
    throw new ApiError(500, "Something went wrong while updating budget");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedBudget, "Budget updated successfully"));
});

const deleteBudget = asyncHandler(async (req, res) => {
  const { budgetId } = req.params;

  if (!budgetId) {
    throw new ApiError(400, "Budget ID is required");
  }

  const deletedBudget = await Budget.findByIdAndDelete(budgetId);

  if (!deleteBudget) {
    throw new ApiError(500, "Something went wrong while deleting the budget");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedBudget, "Budget deleted successfully"));
});

export {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};
