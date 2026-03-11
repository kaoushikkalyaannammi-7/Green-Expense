import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import { startDebtCron } from './cron/debtCron.js';
import cors from 'cors';
import AuthRoutes from './routes/AuthRoutes.js';
import ExpensesRoutes from './routes/ExpensesRoutes.js';
import SavingsRoutes from './routes/SavingsRoutes.js';
import BillsRoutes from './routes/BillsRoutes.js';
import DebtManagementRoutes from './routes/DebtManagementRoutes.js';
dotenv.config();

console.log("ENV CHECK:", {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI ? "LOADED" : "MISSING",
  JWT_SECRET: process.env.JWT_SECRET ? "LOADED" : "MISSING",
});



const app=express();
const PORT=process.env.PORT;
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use('/api/auth',AuthRoutes);
app.use('/api/expenses',ExpensesRoutes);
app.use('/api/savings',SavingsRoutes);
app.use('/api/bills',BillsRoutes);
app.use('/api/debts',DebtManagementRoutes);
app.get('/',(req,res)=>{
    res.send('API is running...');
})

startDebtCron();


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});