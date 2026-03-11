import express from "express";
import {
  calculateMonthlySavings,
  getCurrentSavings,
  addExtraIncome,
  
} from "../controllers/SavingsController.js";
import {protect} from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/income", protect, calculateMonthlySavings);
router.post("/extra-income", protect, addExtraIncome);
router.get("/current", protect, getCurrentSavings);

 
export default router;