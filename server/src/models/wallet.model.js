import mongoose, { Schema } from "mongoose";

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
    type: {
      type: String,
      enum: Object.values(WalletTypes),
      default: WalletTypes.GENERAL,
    },
    initialValue: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "USD",
    },
    color: {
      type: String,
      default: "#0000",
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
