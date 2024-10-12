import Router from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createWallet,
  deleteWallet,
  getAllWallets,
  getWalletById,
  updateWalletInformation,
} from "../controllers/wallet.controller.js";

const router = Router();

router.route("/create-wallet").post(verifyJWT, createWallet);
router.route("/get-all-wallets").get(verifyJWT, getAllWallets);
router.route("/get-wallet-by-id/:walletId").get(verifyJWT, getWalletById);
router
  .route("/update-wallet-info/:walletId")
  .patch(verifyJWT, updateWalletInformation);
router.route("/delete-wallet/:walletId").delete(verifyJWT, deleteWallet);

export default router;
