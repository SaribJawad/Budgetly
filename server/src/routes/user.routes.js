import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAvatar,
  updatePassword,
  updateUserInformation,
  verifyAuth,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);

router.route("/login").post(loginUser);

// secured routes
router.route("/logout").get(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/update-information").patch(verifyJWT, updateUserInformation);
router.route("/change-password").patch(verifyJWT, updatePassword);
router.route("/auth-verify").get(verifyJWT, verifyAuth);
router
  .route("/change-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateAvatar);

export default router;
