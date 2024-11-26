import { asyncHandler } from "../utils/asyncHandler.js";
import { Transaction } from "../models/transaction.model.js";
import { Wallet } from "../models/wallet.model.js";
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
      { $sort: { "_id.year": -1, "_id.month": 1 } },
      {
        $group: {
          _id: null,
          monthlyFlow: {
            $push: {
              month: "$_id.month",
              income: "$totalIncome",
              expense: "$totalExpense",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          monthlyFlow: {
            $map: {
              input: Array.from({ length: 12 }, (_, i) => i + 1),
              as: "flow",
              in: {
                month: "$$flow",
                income: {
                  $let: {
                    vars: {
                      match: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$monthlyFlow",
                              cond: { $eq: ["$$this.month", "$$flow"] },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: { $ifNull: ["$$match.income", 0] },
                  },
                },
                expense: {
                  $let: {
                    vars: {
                      match: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$monthlyFlow",
                              cond: {
                                $eq: ["$$this.month", "$$flow"],
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: { $ifNull: ["$$match.expense", 0] },
                  },
                },
              },
            },
          },
        },
      },
    ]);

    console.log(monthlyFlow);

    return res.status(200).json(
      // monthlyFlow[0].monthlyFlow,
      new ApiResponse(200, monthlyFlow, "Monthly flow fetched successfully")
    );
  } catch (error) {
    console.log(error);
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

const getFinanceSummary = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    if (!mongoose.isValidObjectId(userId)) {
      throw new ApiError(400, "Invalid user ID");
    }

    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    const totalWalletBalance = await Wallet.aggregate([
      {
        $match: {
          walletOwner: userId,
        },
      },
      {
        $group: {
          _id: null,
          totalBalance: { $sum: "$balance" },
        },
      },
    ]);

    const totalBalance = totalWalletBalance[0]?.totalBalance || 0;

    // current month

    const totalIncomeCurrentMonth = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          transactionType: "Income",
          createdAt: {
            $gte: new Date(currentYear, currentMonth - 1, 1),
            $lte: new Date(currentYear, currentMonth, 1),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$amount" },
          totalTransactions: { $sum: 1 },
        },
      },
    ]);

    const totalExpenseCurrentMonth = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          transactionType: "Expense",
          createdAt: {
            $gte: new Date(currentYear, currentMonth - 1, 1),
            $lte: new Date(currentYear, currentMonth, 1),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$amount" },
          totalTransactions: { $sum: 1 },
        },
      },
    ]);

    const currentIncome = totalIncomeCurrentMonth[0]?.totalIncome || 0;
    const currentExpense = totalExpenseCurrentMonth[0]?.totalExpense || 0;
    const currentSavings = currentIncome - currentExpense;

    // previous month

    const totalIncomePreviousMonth = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          transactionType: "Income",
          createdAt: {
            $gte: new Date(currentYear, currentMonth - 2, 1),
            $lte: new Date(currentYear, currentMonth - 1, 1),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$amount" },
        },
      },
    ]);

    const totalExpensePreviousMonth = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          transactionType: "Expense",
          createdAt: {
            $gte: new Date(currentYear, currentMonth - 2, 1),
            $lte: new Date(currentYear, currentMonth - 1, 1),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$amount" },
        },
      },
    ]);

    const previousIncome = totalIncomePreviousMonth[0]?.totalIncome || 0;
    const previousExpense = totalExpensePreviousMonth[0]?.totalExpense || 0;
    const previousSavings = previousIncome - previousExpense;

    // percentage comparison
    const incomeChange = previousIncome
      ? ((currentIncome - previousIncome) / previousIncome) * 100
      : 0;
    const expenseChange = previousExpense
      ? ((currentExpense - previousExpense) / previousExpense) * 100
      : 0;
    const savingsChange = previousSavings
      ? ((currentSavings - previousSavings) / previousSavings) * 100
      : 0;

    const financialSummary = [
      {
        title: "Total balance",
        amount: totalBalance,
      },
      {
        title: "Total income",
        amount: currentIncome,
        percentageChange: incomeChange,
      },
      {
        title: "Total expense",
        amount: currentExpense,
        percentageChange: expenseChange,
      },
      {
        title: "Total Savings",
        amount: currentSavings,
        percentageChange: savingsChange,
      },
    ];

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          financialSummary,
          "Financial summary fetched successfully"
        )
      );
  } catch (error) {
    console.log("Error fetching financial summary", error);
    throw new ApiError(400, "Error fetching financial summary");
  }
});

export {
  getMonthlyFlow,
  getYearlyTrends,
  getTopSpendingCategories,
  getBalanceOverview,
  getFinanceSummary,
};
