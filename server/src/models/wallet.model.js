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
    walletName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(WalletTypes),
      default: WalletTypes.GENERAL,
    },
    initialBalance: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 0,
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
