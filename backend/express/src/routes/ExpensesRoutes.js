import express from 'express'
import { addExpense,getExpenseById,getExpenses,updateExpense,deleteExpense } from "../controllers/ExpensesController.js";
import { protect } from '../middleware/authMiddleware.js';

const router=express.Router();
router.post('/',protect,addExpense);
router.get('/',protect,getExpenses);
router.get('/:id',protect,getExpenseById);
router.put('/:id',protect,updateExpense);
router.delete('/:id',protect,deleteExpense);

export default router;