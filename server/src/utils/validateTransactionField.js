import { TransactionTypes } from "../models/transaction.model.js";
import { ApiError } from "./ApiError.js";

const validateTransactionField = (
  amount,
  transactionType,
  fromWallet,
  toWallet,
  category,
  payee,
  payer
) => {
  if (!amount) {
    throw new ApiError(400, "Amount is required");
  }

  if (
    transactionType === TransactionTypes.INCOME ||
    transactionType === TransactionTypes.EXPENSE
  ) {
    if (!fromWallet) {
      throw new ApiError(
        400,
        "fromWallet is required for income/expense transactions"
      );
    }
    if (toWallet) {
      throw new ApiError(
        400,
        "toWallet is not allowed for income/expense transactions"
      );
    }
    if (transactionType === TransactionTypes.INCOME && payee) {
      throw new ApiError(400, "Payee is not allowed for income");
    }
    if (transactionType === TransactionTypes.EXPENSE && payer) {
      throw new ApiError(400, "Payer is not allowed for expense");
    }
  } else if (transactionType === TransactionTypes.TRANSFER) {
    if (!fromWallet || !toWallet) {
      throw new ApiError(
        400,
        "fromWallet and toWallet are required for transfer transactions"
      );
    }
    if (category) {
      throw new ApiError(
        400,
        "category is not allowed for transfer transactions"
      );
    }
  } else {
    throw new ApiError(400, "Invalid transaction type");
  }
};

export { validateTransactionField };
