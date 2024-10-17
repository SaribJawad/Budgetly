import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createGoal,
  deleteGoal,
  getAllGoals,
  getGoalById,
  getReachedGoals,
  getUncompletedGoals,
  markGoalAsReached,
  updateGoal,
} from "../controllers/goal.controller.js";

const router = Router();

router.route("/create-goal").post(verifyJWT, createGoal);
router.route("/get-all-goals").get(verifyJWT, getAllGoals);

router.route("/get-reached-goals").get(verifyJWT, getReachedGoals);
router.route("/get-uncompleted-goals").get(verifyJWT, getUncompletedGoals);

router
  .route("/:goalId")
  .get(verifyJWT, getGoalById)
  .patch(verifyJWT, updateGoal)
  .delete(verifyJWT, deleteGoal);

router.route("/mark-as-reached/:goalId").patch(verifyJWT, markGoalAsReached);

export default router;
