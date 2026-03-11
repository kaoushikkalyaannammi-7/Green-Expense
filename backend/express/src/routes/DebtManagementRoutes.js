import {protect} from '../middleware/authMiddleware.js';
import express from 'express';
import {createDebt,getDebts,deleteDebt} from '../controllers/DebtManagementController.js';
const router=express.Router();

router.post('/',protect,createDebt);
router.get('/',protect,getDebts);
router.delete('/:id',protect,deleteDebt);

export default router;