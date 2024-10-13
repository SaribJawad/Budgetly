import mongoose, { Schema } from "mongoose";

const BudgetPeriod = {
  NONE: "None",
  WEEK: "Week",
  MONTH: "Month",
  YEAR: "Year",
};

const budgetSchema = new Schema(
  {
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
    notifyOnExceed: {
      // Whether to notify on exceeding the budget
      type: Boolean,
      default: false,
    },
    notifyOnTrending: {
      // Whether to notify on trending overspend

      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Budget = mongoose.model("Budget", budgetSchema);
