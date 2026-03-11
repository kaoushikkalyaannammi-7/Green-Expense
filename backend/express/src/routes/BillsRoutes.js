import express from "express";
import {
  createBill,
  getBills,
  getBillById,
  updateBill,
  markBillPaid,
  deleteBill
} from "../controllers/BillsController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBill);
router.get("/", protect, getBills);
router.get("/:id", protect, getBillById);
router.put("/:id", protect, updateBill);
router.patch("/:id/pay", protect, markBillPaid);
router.delete("/:id", protect, deleteBill);
export default router;