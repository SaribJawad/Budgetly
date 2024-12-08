import mongoose, { Schema } from "mongoose";

const PaymentTypes = {
  CASH: "Cash",
  DEBIT_CARD: "Debit Card",
  CREDIT_CARD: "Credit Card",
  BANK_TRANSFER: "Bank Transfer",
  VOUCHER: "Voucher",
  MOBILE: "Mobile Payment",
  WEB: "Web Payment",
  OTHER: "Other",
};

export const TransactionTypes = {
  INCOME: "Income",
  EXPENSE: "Expense",
  TRANSFER: "Transfer",
};

const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String, // handle from frontend
      required: true,
    },
    transactionType: {
      type: String,
      enum: Object.values(TransactionTypes),
      required: true,
    },
    note: {
      type: String,
    },
    payee: {
      type: String,
    },
    payer: {
      type: String,
    },
    fromWallet: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },
    toWallet: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
      validate: {
        validator: function (value) {
          if (this.transactionType === TransactionTypes.TRANSFER) {
            return value !== null;
          }
          return true;
        },
        message: "toWallet is required for transfer transactions",
      },
    },
    paymentType: {
      type: String,
      enum: Object.values(PaymentTypes),
      required: true,
    },
    attachment: {
      type: {
        url: String,
        publicId: String,
      },
    },
    time: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);

// type: Schema.Types.ObjectId,
// ref: "Wallet",
// required: true,
