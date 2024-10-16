import { TransactionTypes } from "../models/transaction.model.js";
import { adjustWalletBalance } from "./adjustWalletBalance.js";

export const reverseTransactionEffects = async (
  transaction,
  userWallet,
  toWalletEntity
) => {
  switch (transaction.transactionType) {
    case TransactionTypes.INCOME:
      await adjustWalletBalance(userWallet, transaction.amount, "subtract");

      break;
    case TransactionTypes.EXPENSE:
      await adjustWalletBalance(userWallet, transaction.amount, "add");

      break;
    case TransactionTypes.TRANSFER:
      await adjustWalletBalance(userWallet, transaction.amount, "add");

      if (toWalletEntity && transaction.toWallet !== "outside of the wallet") {
        await adjustWalletBalance(
          toWalletEntity,
          transaction.amount,
          "subtract"
        );
      }

      break;
  }
};
