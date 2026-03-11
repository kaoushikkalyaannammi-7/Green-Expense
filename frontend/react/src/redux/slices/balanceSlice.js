import {createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL='http://localhost:5000/api/savings';
//fetch balance
export const fetchCurrentBalanceThunk=createAsyncThunk(
    'balance/fetchCurrentBalance',
    async()=>{
        const res=await axios.get(`${API_URL}/current`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        });
        return res.data.savings;
    }
);

const balanceSlice=createSlice({
    name:'balance',
    initialState:{
        monthlySavings:null,
        totalSavings:0,
        status:'idle',
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCurrentBalanceThunk.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchCurrentBalanceThunk.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.monthlySavings = action.payload;
            state.monthlySavings = action.payload;

            if (action.payload) {
              state.totalSavings = action.payload.completeSavings;
            } else {
              state.totalSavings = 0;
            }
        })
        .addCase(fetchCurrentBalanceThunk.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.error.message;
        });
    }
})
export default balanceSlice.reducer;