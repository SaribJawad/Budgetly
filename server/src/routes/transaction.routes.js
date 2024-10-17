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

const router = Router();

router
  .route("/create-transaction")
  .post(verifyJWT, upload.single("attachment"), createTransaction);

router.route("/get-all-transactions").get(verifyJWT, getAllTransactions);

router.route("/filtered-transactions").get(verifyJWT, getFilteredTransactions);

router
  .route("/:transactionId")
  .get(verifyJWT, getTransactionById)
  .patch(verifyJWT, upload.single("attachment"), updateTransaction)
  .delete(verifyJWT, deleteTransaction);

export default router;
