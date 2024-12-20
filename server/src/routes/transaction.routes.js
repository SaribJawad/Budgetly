import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getFilteredTransactions,
  getTransactionById,
  updateTransaction,
} from "../controllers/transaction.controller.js";
import { getExpenseTransactions } from "../controllers/analytics.controller.js";

const router = Router();

router
  .route("/create-transaction")
  .post(verifyJWT, upload.single("attachment"), createTransaction);

router.route("/get-all-transactions").get(verifyJWT, getAllTransactions);
router
  .route("/get-expense-transactions")
  .get(verifyJWT, getExpenseTransactions);

router.route("/filtered-transactions").post(verifyJWT, getFilteredTransactions);

router
  .route("/:transactionId")
  .get(verifyJWT, getTransactionById)
  .patch(verifyJWT, upload.single("attachment"), updateTransaction)
  .delete(verifyJWT, deleteTransaction);

export default router;
