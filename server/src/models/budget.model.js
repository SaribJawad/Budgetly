import mongoose, { Schema } from "mongoose";

export const BudgetPeriod = {
  NONE: "None",
  WEEK: "Week",
  MONTH: "Month",
  YEAR: "Year",
};

const budgetSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      requried: true,
    },
    name: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      enum: Object.values(BudgetPeriod),
      default: BudgetPeriod.NONE,
    },
    amount: {
      type: Number,
      required: true,
    },
    spentAmount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      default: "All",
    },
    wallet: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Budget = mongoose.model("Budget", budgetSchema);
