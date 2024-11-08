import { asyncHandler } from "../utils/asyncHandler.js";
import { Transaction } from "../models/transaction.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";

const getMonthlyFlow = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!mongoose.isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID.");
  }

  try {
    const monthlyFlow = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$transactionType", "Income"] }, "$amount", 0],
            },
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$transactionType", "Expense"] }, "$amount", 0],
            },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    return res
      .status(200)
      .json(
        new ApiResponse(200, monthlyFlow, "Monthly flow fetched successfully")
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while fetching monthly flow."
    );
  }
});

const getYearlyTrends = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const currentYear = new Date().getFullYear();

  if (!mongoose.isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID.");
  }

  const yearlyTrends = await Transaction.aggregate([
    {
      $match: {
        user: userId,
        createdAt: {
          $gte: new Date(`${currentYear}-01-01`),
          $lte: new Date(`${currentYear}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalIncome: {
          $sum: {
            $cond: [{ $eq: ["$transactionType", "Income"] }, "$amount", 0],
          },
        },
        totalExpense: {
          $sum: {
            $cond: [{ $eq: ["$transactionType", "Expense"] }, "$amount", 0],
          },
        },
      },
    },

    {
      $sort: { _id: 1 },
    },
  ]);

  const trendsWithSaving = yearlyTrends.map((month) => ({
    month: month._id,
    totalIncome: month.totalIncome,
    totalExpense: month.totalExpense,
    savings: month.totalIncome - month.totalExpense,
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        trendsWithSaving,
        "Yearly trends fetched successfully"
      )
    );
});

const getTopSpendingCategories = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { year, limit = 5 } = req.query;
  const currentYear = year || new Date().getFullYear();

  if (!mongoose.isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID.");
  }

  try {
    const topSpendingCategories = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          transactionType: "Expense",
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: "$category",
          totalSpent: { $sum: "$amount" },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: parseInt(limit) },
    ]);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          topSpendingCategories,
          "Top spending categories fetched successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      400,
      "Some thing went wrong while fetching top spending categories"
    );
  }
});

// TODO  :  TOTAl BALANCE OVERVIEW (compare current year to last year balance get the difference)

export { getMonthlyFlow, getYearlyTrends, getTopSpendingCategories };
