import {configureStore} from '@reduxjs/toolkit';
import balanceReducer from './slices/balanceSlice.js';
import savingsReducer from './slices/savingsSlice.js';
import expensesReducer from './slices/expensesSlice.js';
import debtReducer from './slices/debtSlice.js';
export const store=configureStore({
    reducer:{
        balance:balanceReducer,
        savings:savingsReducer,
        expenses:expensesReducer,
        debts:debtReducer,
    },
})
