import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
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

export default router;
