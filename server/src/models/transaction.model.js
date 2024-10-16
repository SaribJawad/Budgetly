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
      type: Schema.Types.Mixed,
      required: true,
      validate: {
        validator: function (value) {
          return mongoose.isValidObjectId(value) || typeof value === "string";
        },
      },
      message: (props) => `${props.value} is not a valid ObjectId or string`,
    },
    toWallet: {
      type: Schema.Types.Mixed,
      required: function () {
        return this.transactionType === TransactionTypes.TRANSFER;
      },
      validate: {
        validator: function (value) {
          return mongoose.isValidObjectId(value) || typeof value === "string";
        },
        message: (props) => `${props.value} is not a valid ObjectId or string`,
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
