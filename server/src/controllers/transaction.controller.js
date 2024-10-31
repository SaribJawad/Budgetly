import mongoose from "mongoose";
import { Transaction, TransactionTypes } from "../models/transaction.model.js";
import { Wallet } from "../models/wallet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/fileHandler.js";
import { validateTransactionField } from "../utils/validateTransactionField.js";
import { adjustWalletBalance } from "../utils/adjustWalletBalance.js";
import { reverseTransactionEffects } from "../utils/reverseTransactionEffects.js";
import { Budget } from "../models/budget.model.js";

const createTransaction = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const {
    amount,
    category,
    transactionType,
    note,
    payee,
    payer,
    fromWallet,
    toWallet,
    paymentType,
    time,
  } = req.body;

  validateTransactionField(
    amount,
    transactionType,
    fromWallet,
    toWallet,
    category,
    payee,
    payer
  );

  const userWallet = mongoose.isValidObjectId(fromWallet)
    ? await Wallet.findById(fromWallet)
    : null;

  const toWalletEntity = mongoose.isValidObjectId(toWallet)
    ? await Wallet.findById(toWallet)
    : null;

  switch (transactionType) {
    case TransactionTypes.INCOME:
      await adjustWalletBalance(userWallet, amount, "add");
      break;
    case TransactionTypes.EXPENSE:
      await adjustWalletBalance(userWallet, amount, "subtract");
      break;
    case TransactionTypes.TRANSFER:
      await adjustWalletBalance(userWallet, amount, "subtract");
      if (toWalletEntity) {
        await adjustWalletBalance(toWalletEntity, amount, "add");
      }

      break;
  }
  userWallet.save({ validateBeforeSave: false });

  const attachmentLocalPath = req.file?.path;

  let attachmentFromCloudinary;
  if (attachmentLocalPath) {
    attachmentFromCloudinary = await uploadOnCloudinary(attachmentLocalPath);
  }

  if (transactionType === TransactionTypes.EXPENSE) {
    try {
      const updateBudget = await Budget.findOne({
        user: userId,
        category,
        wallet: fromWallet,
      });

      if (!updateBudget) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              {},
              `No budget exists for category ${category}`
            )
          );
      }

      updateBudget.spentAmount += Number(amount);
      await updateBudget.save({ validateBeforeSave: false });
    } catch (error) {
      throw new ApiError(500, "Something went wrong while updating wallet");
    }
  }

  const transaction = await Transaction.create({
    user: userId,
    amount,
    transactionType,
    category,
    note: note || undefined,
    payee: payee || undefined,
    payer: payer || undefined,
    fromWallet,
    toWallet: toWallet || undefined,
    paymentType,
    attachment: attachmentFromCloudinary
      ? {
          url: attachmentFromCloudinary.url,
          public_id: attachmentFromCloudinary.public_id,
        }
      : undefined,
    time: time || undefined,
  });

  if (!transaction) {
    throw new ApiError(500, "Something went wrong while creating transaction");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, transaction, "Transaction created successfully")
    );
});

const getAllTransactions = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const results = await Transaction.aggregate([
    { $match: { user: userId } },
    {
      $facet: {
        paginatedResults: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ]);

  if (!results) {
    throw new ApiError(500, "Something went wrong while fetching transactions");
  }

  const transaction = results[0].paginatedResults;
  const totalCount = results[0].totalCount[0]?.count || 0;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { transaction, totalCount },
        "Transactions fetched successfully"
      )
    );
});

const getTransactionById = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;

  if (!transactionId) {
    throw new ApiError(400, "Transaction ID is required");
  }

  if (!mongoose.isValidObjectId(transactionId)) {
    throw new ApiError(400, "Invalid Transaction ID format");
  }

  const transaction = await Transaction.findById(transactionId);

  if (!transaction) {
    throw new ApiError(500, "Something went wrong while fetching transaction");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, transaction, "Transaction fetched succesfully"));
});

const updateTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(transactionId)) {
    throw new ApiError(400, "Invalid transaction ID");
  }

  const originalTransaction = await Transaction.findById(transactionId);

  if (!originalTransaction) {
    throw new ApiError(404, "Transaction not found");
  }

  const updateFields = Object.assign(
    {},
    req.body.amount && { amount: req.body.amount },
    req.body.category && { category: req.body.category },
    req.body.note && { note: req.body.note },
    req.body.paymentType && { paymentType: req.body.paymentType },
    req.body.transactionType && { transactionType: req.body.transactionType },
    req.body.fromWallet && { fromWallet: req.body.fromWallet },
    req.body.toWallet && { toWallet: req.body.toWallet },
    req.file?.path && { attachment: req.file?.path },
    req.body.payer && { payer: req.body.payer },
    req.body.payee && { payee: req.body.payee }
  );

  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(400, "At least one field is requried");
  }

  // Handle wallets if valid ObjectId
  const userWallet = mongoose.isValidObjectId(originalTransaction.fromWallet)
    ? await Wallet.findById(originalTransaction.fromWallet)
    : null;

  const toWalletEntity = mongoose.isValidObjectId(originalTransaction.toWallet)
    ? await Wallet.findById(originalTransaction.toWallet)
    : null;

  // Reverse the effect of the original transaction

  await reverseTransactionEffects(
    originalTransaction,
    userWallet,
    toWalletEntity
  );

  const applyNewTransaction = async () => {
    const newAmount = updateFields.amount || originalTransaction.amount;
    const newTransactionType =
      updateFields.transactionType || originalTransaction.transactionType;
    switch (newTransactionType) {
      case TransactionTypes.INCOME:
        updateFields.payee = undefined;
        await adjustWalletBalance(userWallet, newAmount, "add");
        break;
      case TransactionTypes.EXPENSE:
        updateFields.payer = undefined;
        await adjustWalletBalance(userWallet, newAmount, "subtract");

        break;
      case TransactionTypes.TRANSFER:
        updateFields.payer = undefined;
        await adjustWalletBalance(userWallet, newAmount, "subtract");
        if (
          mongoose.isValidObjectId(updateFields.toWallet) &&
          updateFields.toWallet !== "outside of the wallet"
        ) {
          const newToWallet = await Wallet.findById(updateFields.toWallet);
          if (!newToWallet) {
            throw new ApiError(404, "New toWallet not found");
          }
          await adjustWalletBalance(newToWallet, newAmount, "add");
        }

        break;
    }
  };

  await applyNewTransaction();

  let attachmentFromCloudinary;
  if (updateFields.attachment) {
    try {
      attachmentFromCloudinary = await uploadOnCloudinary(
        updateFields.attachment
      );

      await deleteFromCloudinary(originalTransaction?.attachment?.publicId);

      updateFields.attachment = {
        url: attachmentFromCloudinary.url,
        publicId: attachmentFromCloudinary.public_id,
      };
    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong while uploading attachment to cloudinary"
      );
    }
  }

  Object.assign(originalTransaction, updateFields);
  const updatedTransaction = await originalTransaction.save({
    validateBeforeSave: false,
  });

  if (!updatedTransaction) {
    throw new ApiError(500, "Something went wrong while updating transaction");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedTransaction,
        "Transaction updated successfully"
      )
    );
});

const deleteTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;

  const transactionToDelete = await Transaction.findById(transactionId);

  if (!transactionToDelete) {
    throw new ApiError(404, "Transaction not found");
  }
  const userWallet = mongoose.isValidObjectId(transactionToDelete.fromWallet)
    ? await Wallet.findById(transactionToDelete.fromWallet)
    : null;
  console.log("delete balance place", userWallet.balance);

  const toWalletEntity = mongoose.isValidObjectId(transactionToDelete.toWallet)
    ? await Wallet.findById(transactionToDelete.fromWallet)
    : null;

  await reverseTransactionEffects(
    transactionToDelete,
    userWallet,
    toWalletEntity
  );

  if (transactionToDelete?.attachment?.publicId) {
    await deleteFromCloudinary(transactionToDelete.attachment.publicId);
  }

  await transactionToDelete.deleteOne();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Transaction deleted and wallet updated successfully"
      )
    );
});

const getFilteredTransactions = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { transactionType, fromDate, toDate, category } = req.query;

  const filterCriteria = { user: userId };

  if (transactionType) {
    filterCriteria.transactionType = transactionType;
  }

  if (fromDate && toDate) {
    filterCriteria.time = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }

  if (category) {
    filterCriteria.category = category;
  }

  const filteredTransactions = await Transaction.find(filterCriteria);

  if (!filteredTransactions || filteredTransactions.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, [], "No transactions found"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        filteredTransactions,
        "Transactions retrieved successfully"
      )
    );
});

export {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getFilteredTransactions,
};
