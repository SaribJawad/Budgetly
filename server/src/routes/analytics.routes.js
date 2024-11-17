import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getBalanceOverview,
  getFinanceSummary,
  getMonthlyFlow,
  getTopSpendingCategories,
  getYearlyTrends,
} from "../controllers/analytics.controller.js";

const router = Router();

router.route("/monthly-flow").get(verifyJWT, getMonthlyFlow);
router.route("/get-yearly-trends").get(verifyJWT, getYearlyTrends);
router
  .route("/get-top-spending-categories")
  .get(verifyJWT, getTopSpendingCategories);
router.route("/get-balance-overview").get(verifyJWT, getBalanceOverview);
router.route("/get-finance-summary").get(verifyJWT, getFinanceSummary);

export default router;
