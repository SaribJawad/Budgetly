import mongoose, { Schema } from "mongoose";

// id
// accountname
// accountNumber
// typeOf
// amount
// currency
// color
// wallet_owner

const WalletTypes = {
  GENERAL: "General",
  CASH: "Cash",
  CURRENT_ACCOUNT: "Current Account",
  CREDIT_CARD: "Credit Card",
  SAVING_ACCOUNT: "Saving Account",
  BONUS: "Bonus",
  INSURANCE: "Insurance",
  INVESTMENT: "Investment",
  LOAN: "Loan",
  MORTGAGE: "Mortgage",
  ACCOUNT_WITH_OVERDRAFT: "Account with Overdraft",
};

const walletSchema = new Schema(
  {
    accountName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    typeOf: {
      type: String,
      enum: Object.values(WalletTypes),
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    currency: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    walletOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Wallet = mongoose.model("Wallet", walletSchema);
