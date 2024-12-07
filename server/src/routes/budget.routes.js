import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createBudget,
  deleteBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
} from "../controllers/budget.controller.js";

const router = Router();

router.route("/create-budget").post(verifyJWT, createBudget);
router.route("/get-all-budgets").get(verifyJWT, getAllBudgets);
router.route("/get-budget/:budgetId").get(verifyJWT, getBudgetById);
router.route("/update-budget/:budgetId").patch(verifyJWT, updateBudget);
router.route("/delete-budget/:budgetId").delete(verifyJWT, deleteBudget);

export default router;
