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

  const currentYear = new Date().getFullYear();

  try {
    const monthlyFlow = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },
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
          $lte: new Date(`${currentYear + 1}-01-01`),
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
const getBalanceOverview = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const currentYear = new Date().getFullYear();

  if (!mongoose.isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID.");
  }

  const currentYearBalance = await Transaction.aggregate([
    {
      $match: {
        user: userId,
        transactionType: "Income",
        createdAt: {
          $gte: new Date(`${currentYear}-01-01`),
          $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalBalance: { $sum: "$amount" },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $group: {
        _id: null,
        currentYearBalance: {
          $push: {
            month: "$_id",
            totalBalance: "$totalBalance",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        currentYearBalance: {
          $map: {
            input: Array.from({ length: 12 }, (_, i) => i + 1),
            as: "month",
            in: {
              month: "$$month",
              totalBalance: {
                $let: {
                  vars: {
                    match: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$currentYearBalance",
                            cond: { $eq: ["$$this.month", "$$month"] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                  in: { $ifNull: ["$$match.totalBalance", 0] },
                },
              },
            },
          },
        },
      },
    },
  ]).then(
    (results) =>
      results[0] || {
        currentYearBalance: Array.from({ length: 12 }, (_, index) => ({
          month: index + 1,
          totalBalance: 0,
        })),
      }
  );

  const lastYearBalance = await Transaction.aggregate([
    {
      $match: {
        user: userId,
        transactionType: "Income",
        createdAt: {
          $gte: new Date(`${currentYear - 1}-01-01`),
          $lte: new Date(`${currentYear - 1}-12-31T23:59:59.999Z`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalBalance: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $group: {
        _id: null,
        lastYearBalance: {
          $push: {
            month: "$_id",
            totalBalance: "$totalBalance",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        lastYearBalance: {
          $map: {
            input: Array.from({ length: 12 }, (_, i) => i + 1),
            as: "month",
            in: {
              month: "$$month",
              totalBalance: {
                $let: {
                  vars: {
                    match: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: { $ifNull: ["$lastYearBalance", []] },
                            cond: { $eq: ["$$this.month", "$$month"] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                  in: { $ifNull: ["$$match.totalBalance", 0] },
                },
              },
            },
          },
        },
      },
    },
  ]).then(
    (results) =>
      results[0] || {
        lastYearBalance: Array.from({ length: 12 }, (_, index) => ({
          month: index + 1,
          totalBalance: 0,
        })),
      }
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        [currentYearBalance, lastYearBalance],
        "Balance overview fetched succesfully"
      )
    );
});

export {
  getMonthlyFlow,
  getYearlyTrends,
  getTopSpendingCategories,
  getBalanceOverview,
};
