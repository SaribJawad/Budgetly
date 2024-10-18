import cron from "node-cron";
import { Budget } from "../models/budget.model.js";
import { BudgetPeriod } from "../models/budget.model.js";

const getExpirationDate = (createdAt, period) => {
  const expiryDate = new Date(createdAt);

  switch (period) {
    case BudgetPeriod.WEEK:
      expiryDate.setDate(expiryDate.getDate() + 7);
      break;
    case BudgetPeriod.MONTH:
      expiryDate.setDate(expiryDate.getMonth() + 1);
      break;
    case BudgetPeriod.YEAR:
      expiryDate.setDate(expiryDate.getFullYear() + 1);
      break;
    default:
      return null;
  }

  return expiryDate;
};

const deleteExpiredBudgets = async () => {
  try {
    const budgets = await Budget.find();

    const now = new Date();

    budgets.forEach(async (budget) => {
      const expirationDate = getExpirationDate(budget.createdAt, budget.period);

      if (expirationDate && now > expirationDate) {
        await Budget.findByIdAndDelete(budget._id);
        console.log(`Deleted budget with name: ${budget.name}`);
      }
    });
  } catch (error) {
    console.error(`Error deleting expired budgets: ${error}`);
  }
};

cron.schedule("0 0 * * *", async () => {
  console.log("Running budget cleaning task...");
  await deleteExpiredBudgets();
});
