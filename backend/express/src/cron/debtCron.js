import cron from 'node-cron';
import Debt from '../models/DebtManagement.js';
import { processDebts } from '../utils/processDebts.js';

export const startDebtCron = () => {
    console.log('Starting debt processing cron job...');
  cron.schedule('* * * * *', async () => {
    try{
        console.log('processing monthly debts...');
        await processDebts();
        console.log('Debt processing completed');
    } catch (error) {
        console.error('Error during debt processing cron job:', error);
    }
    
  });
};